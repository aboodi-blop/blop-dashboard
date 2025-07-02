import { Alert, AlertDescription } from './ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, AlertTriangle, Info, Settings } from 'lucide-react';
import { isFirebaseEnabled, isDemoMode } from '../lib/firebase';

interface EnvironmentStatusProps {
  className?: string;
}

export function EnvironmentStatus({ className }: EnvironmentStatusProps) {
  const envVars = {
    'VITE_FIREBASE_API_KEY': import.meta.env?.VITE_FIREBASE_API_KEY,
    'VITE_FIREBASE_AUTH_DOMAIN': import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN,
    'VITE_FIREBASE_PROJECT_ID': import.meta.env?.VITE_FIREBASE_PROJECT_ID,
    'VITE_FIREBASE_STORAGE_BUCKET': import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET,
    'VITE_FIREBASE_MESSAGING_SENDER_ID': import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID,
    'VITE_FIREBASE_APP_ID': import.meta.env?.VITE_FIREBASE_APP_ID,
  };

  const requiredVars = Object.keys(envVars);
  const configuredVars = requiredVars.filter(key => envVars[key as keyof typeof envVars]);
  const missingVars = requiredVars.filter(key => !envVars[key as keyof typeof envVars]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Environment Configuration
        </CardTitle>
        <CardDescription>
          Current Firebase configuration status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Status */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Firebase Status:</span>
          <Badge variant={isFirebaseEnabled ? "default" : "secondary"}>
            {isFirebaseEnabled ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Demo Mode
              </>
            )}
          </Badge>
        </div>

        {/* Configuration Details */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Configuration Variables:</h4>
          <div className="space-y-1">
            {requiredVars.map((varName) => {
              const isConfigured = !!envVars[varName as keyof typeof envVars];
              return (
                <div key={varName} className="flex items-center justify-between text-sm">
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {varName}
                  </code>
                  <Badge variant={isConfigured ? "default" : "outline"} className="text-xs">
                    {isConfigured ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Set
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Missing
                      </>
                    )}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Messages */}
        {isDemoMode ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Demo Mode Active:</strong> The application is running with mock data. 
              To use Firebase, set up your environment variables in a <code>.env.local</code> file.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Firebase Connected:</strong> All data is synchronized with your Firebase project.
            </AlertDescription>
          </Alert>
        )}

        {/* Configuration Help */}
        {missingVars.length > 0 && (
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">To enable Firebase:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Copy <code>.env.example</code> to <code>.env.local</code></li>
              <li>Fill in your Firebase project configuration</li>
              <li>Restart the development server</li>
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
}