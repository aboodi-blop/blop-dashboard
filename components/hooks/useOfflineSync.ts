import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface OfflineAction {
  id: string;
  type: 'add' | 'update' | 'delete';
  collection: 'income' | 'expenses' | 'investors';
  data: any;
  timestamp: number;
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);

  useEffect(() => {
    // Load pending actions from localStorage
    const saved = localStorage.getItem('pendingActions');
    if (saved) {
      try {
        setPendingActions(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading pending actions:', error);
      }
    }

    const handleOnline = () => {
      setIsOnline(true);
      syncPendingActions();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Save pending actions to localStorage
    localStorage.setItem('pendingActions', JSON.stringify(pendingActions));
  }, [pendingActions]);

  const addPendingAction = (action: Omit<OfflineAction, 'id' | 'timestamp'>) => {
    const newAction: OfflineAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    
    setPendingActions(prev => [...prev, newAction]);
    
    if (!isOnline) {
      toast.info('Action saved offline. Will sync when connection is restored.');
    }
  };

  const syncPendingActions = async () => {
    if (pendingActions.length === 0) return;

    toast.info('Syncing offline changes...');
    
    try {
      // Import Firebase services dynamically to avoid circular dependencies
      const { incomeService, expenseService, investorService } = await import('../lib/firestore');
      
      const services = {
        income: incomeService,
        expenses: expenseService,
        investors: investorService
      };

      let syncedCount = 0;
      const failedActions: OfflineAction[] = [];

      for (const action of pendingActions) {
        try {
          const service = services[action.collection];
          
          switch (action.type) {
            case 'add':
              await service.add(action.data.userId, action.data);
              break;
            case 'update':
              await service.update(action.data.id, action.data);
              break;
            case 'delete':
              await service.delete(action.data.id);
              break;
          }
          
          syncedCount++;
        } catch (error) {
          console.error(`Failed to sync action ${action.id}:`, error);
          failedActions.push(action);
        }
      }

      setPendingActions(failedActions);
      
      if (syncedCount > 0) {
        toast.success(`Synced ${syncedCount} offline changes`);
      }
      
      if (failedActions.length > 0) {
        toast.error(`Failed to sync ${failedActions.length} changes. Will retry later.`);
      }
    } catch (error) {
      console.error('Error syncing pending actions:', error);
      toast.error('Failed to sync offline changes');
    }
  };

  const clearPendingActions = () => {
    setPendingActions([]);
    localStorage.removeItem('pendingActions');
  };

  return {
    isOnline,
    pendingActions,
    addPendingAction,
    syncPendingActions,
    clearPendingActions,
    hasPendingActions: pendingActions.length > 0
  };
}