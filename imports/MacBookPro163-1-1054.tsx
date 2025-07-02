import svgPaths from "./svg-07wu45htv6";

function DateFilterButton() {
  return (
    <div
      className="bg-[#1e1e1e] min-w-[130px] relative rounded-[15px] shrink-0"
      data-name="Date Filter Button"
    >
      <div className="flex flex-row items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center min-w-inherit px-6 py-3 relative">
          <div className="basis-0 font-['Serotiva:Semi_Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center">
            <p className="block leading-[normal]">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DateFilterButton1() {
  return (
    <div
      className="bg-[#ffffff] min-w-[130px] relative rounded-[15px] shrink-0"
      data-name="Date Filter Button"
    >
      <div className="flex flex-row items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center min-w-inherit px-6 py-3 relative">
          <div className="basis-0 font-['Serotiva:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#afa8c7] text-[16px] text-center">
            <p className="block leading-[normal]">This week</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DateFilterButton2() {
  return (
    <div
      className="bg-[#ffffff] min-w-[130px] relative rounded-[15px] shrink-0"
      data-name="Date Filter Button"
    >
      <div className="flex flex-row items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center min-w-inherit px-6 py-3 relative">
          <div className="basis-0 font-['Serotiva:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#afa8c7] text-[16px] text-center">
            <p className="block leading-[normal]">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="box-border content-stretch flex flex-row gap-3 items-center justify-center p-0 relative shrink-0">
      <DateFilterButton />
      <DateFilterButton1 />
      <DateFilterButton2 />
    </div>
  );
}

function Tray() {
  return (
    <div className="relative shrink-0 size-12" data-name="Tray">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
      >
        <g id="Tray">
          <path d={svgPaths.p41c8200} fill="var(--fill-0, white)" />
          <path
            d={svgPaths.p5bd9000}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function ChatTeardrop() {
  return (
    <div className="relative shrink-0 size-12" data-name="ChatTeardrop">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
      >
        <g id="ChatTeardrop">
          <path d={svgPaths.p41c8200} fill="var(--fill-0, white)" />
          <path
            d={svgPaths.p2d184b00}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function GearSix() {
  return (
    <div className="relative shrink-0 size-12" data-name="GearSix">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
      >
        <g id="GearSix">
          <path d={svgPaths.p41c8200} fill="var(--fill-0, white)" />
          <path
            d={svgPaths.p1a9dab00}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-12" data-name="User">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
      >
        <g id="User">
          <path d={svgPaths.p41c8200} fill="var(--fill-0, white)" />
          <path
            d={svgPaths.p383b9400}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function UserSettings() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1.5 items-center justify-end p-0 relative shrink-0"
      data-name="UserSettings"
    >
      <Tray />
      <ChatTeardrop />
      <GearSix />
      <User />
    </div>
  );
}

function Frame2() {
  return (
    <div className="box-border content-stretch flex flex-col font-['Serotiva:Regular',_sans-serif] items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-[97px]">
      <div className="relative shrink-0 text-[#1e1e1e] text-[16px] w-full">
        <p className="block leading-[normal]">Aboodi</p>
      </div>
      <div className="relative shrink-0 text-[#9747ff] text-[10px] w-full">
        <p className="block leading-[normal]">3D Designer</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="box-border content-stretch flex flex-row gap-3 items-center justify-end p-0 relative shrink-0">
      <UserSettings />
      <Frame2 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between pb-6 pt-12 px-12 relative w-full">
          <div
            className="h-[58px] relative shrink-0 w-[120.618px]"
            data-name="Blop Logo"
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 121 58"
            >
              <g id="Blop Logo">
                <path d={svgPaths.p78d8300} fill="var(--fill-0, #1E1E1E)" />
                <path d={svgPaths.p25322800} fill="var(--fill-0, #1E1E1E)" />
                <path d={svgPaths.p2a1dc780} fill="var(--fill-0, #1E1E1E)" />
                <path d={svgPaths.p38fcee30} fill="var(--fill-0, #1E1E1E)" />
              </g>
            </svg>
          </div>
          <Frame1 />
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function DashboardButton() {
  return (
    <div className="relative shrink-0 size-12" data-name="Dashboard Button">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
      >
        <g id="Dashboard Button">
          <path d={svgPaths.p41c8200} fill="var(--fill-0, #1E1E1E)" />
          <path d={svgPaths.p6b6e800} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ProjectsButton() {
  return (
    <div className="relative shrink-0 size-12" data-name="Projects Button">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
      >
        <g id="Projects Button">
          <path d={svgPaths.p41c8200} fill="var(--fill-0, white)" />
          <path
            d={svgPaths.p11fd3700}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function TasksButton() {
  return (
    <div className="relative shrink-0 size-12" data-name="Tasks Button">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
      >
        <g id="Tasks Button">
          <path d={svgPaths.p41c8200} fill="var(--fill-0, white)" />
          <path
            d={svgPaths.p1b506880}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function TeamButton() {
  return (
    <div className="relative shrink-0 size-12" data-name="Team Button">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
      >
        <g id="Team Button">
          <path d={svgPaths.p41c8200} fill="var(--fill-0, white)" />
          <path
            d={svgPaths.p1a4b300}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function ClientButton() {
  return (
    <div className="relative shrink-0 size-12" data-name="Client Button">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
      >
        <g id="Client Button">
          <path d={svgPaths.p41c8200} fill="var(--fill-0, white)" />
          <path
            d={svgPaths.p1d245e80}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 h-full items-start justify-start pb-12 pl-12 pr-0 pt-6 relative">
          <DashboardButton />
          <ProjectsButton />
          <TasksButton />
          <TeamButton />
          <ClientButton />
        </div>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#1e1e1e] text-left w-[340px]"
      data-name="Intro"
    >
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] relative shrink-0 text-[40px] w-full">
        <p className="block leading-[normal]">Hi, Aboodi!</p>
      </div>
      <div className="font-['Serotiva:Regular',_sans-serif] relative shrink-0 text-[16px] w-full">
        <p className="block leading-[normal]">{`Manage & track your projects and clients`}</p>
      </div>
    </div>
  );
}

function MagnifyingGlass() {
  return (
    <div className="relative shrink-0 size-6" data-name="MagnifyingGlass">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="MagnifyingGlass">
          <path
            d={svgPaths.p3ee3db00}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function SearchBar() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow max-w-[500px] min-h-px min-w-[300px] relative rounded-[15px] shrink-0"
      data-name="Search Bar"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-row items-center max-w-inherit min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-center justify-start max-w-inherit min-w-inherit px-6 py-3 relative w-full">
          <MagnifyingGlass />
          <div className="basis-0 font-['Serotiva:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left">
            <p className="block leading-[normal]">
              Search Task, Meetings, Projects...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between pl-6 pr-12 py-6 relative w-full">
          <Intro />
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame5 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame8 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0 w-full">
      <Frame10 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[20px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">My Tasks</p>
      </div>
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p22013bf0}
            fill="var(--fill-0, #1E1E1E)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function DateFilterButton3() {
  return (
    <div
      className="basis-0 bg-[#1e1e1e] grow min-h-px min-w-px relative rounded-[15px] shrink-0"
      data-name="Date Filter Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-6 py-3 relative w-full">
          <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DateFilterButton4() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-[15px] shrink-0"
      data-name="Date Filter Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-6 py-3 relative w-full">
          <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#afa8c7] text-[16px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Tomorrow</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex flex-row gap-3 items-center justify-center p-0 relative shrink-0 w-full">
      <DateFilterButton3 />
      <DateFilterButton4 />
    </div>
  );
}

function FlatColorIconsGoogle() {
  return (
    <div
      className="relative shrink-0 size-6"
      data-name="flat-color-icons:google"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="flat-color-icons:google">
          <path
            d={svgPaths.p257b0b00}
            fill="var(--fill-0, #FFC107)"
            id="Vector"
          />
          <path
            d={svgPaths.p3347ed00}
            fill="var(--fill-0, #FF3D00)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p3edb9900}
            fill="var(--fill-0, #4CAF50)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p8514300}
            fill="var(--fill-0, #1976D2)"
            id="Vector_4"
          />
        </g>
      </svg>
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-5" data-name="Check">
      <div className="absolute bottom-0 left-[-2.247%] right-0 top-[-0.475%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 21 21"
        >
          <g id="Check">
            <path
              d={svgPaths.p2e8a0b00}
              fill="var(--fill-0, #00AB7B)"
              id="Vector"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <FlatColorIconsGoogle />
      <Check />
    </div>
  );
}

function Frame14() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-full">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] relative shrink-0 text-[#1e1e1e] text-[16px] w-full">
        <p className="block leading-[normal]">Google SEO Improvement</p>
      </div>
      <div className="font-['Serotiva:Regular',_sans-serif] relative shrink-0 text-[10px] text-neutral-500 w-full">
        <p className="block leading-[normal]">
          Improve Search Optimization for Website
        </p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Blop Website</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard() {
  return (
    <div
      className="bg-[#fff5ed] h-[150px] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col h-[150px] items-end justify-between p-[12px] relative w-full">
          <Frame13 />
          <Frame14 />
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function FlatColorIconsGoogle1() {
  return (
    <div
      className="relative shrink-0 size-6"
      data-name="flat-color-icons:google"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="flat-color-icons:google">
          <path
            d={svgPaths.p1f37280}
            fill="var(--fill-0, #1E1E1E)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Check1() {
  return (
    <div className="relative shrink-0 size-5" data-name="Check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Check">
          <path
            d={svgPaths.p3ebcc080}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <FlatColorIconsGoogle1 />
      <Check1 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-full">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] relative shrink-0 text-[#1e1e1e] text-[16px] w-full">
        <p className="block leading-[normal]">Blop website Publishing</p>
      </div>
      <div className="font-['Serotiva:Regular',_sans-serif] relative shrink-0 text-[10px] text-neutral-500 w-full">
        <p className="block leading-[normal]">Publishing requirements</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Blop Website</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard1() {
  return (
    <div
      className="bg-[#fff5ed] h-[150px] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col h-[150px] items-end justify-between p-[12px] relative w-full">
          <Frame15 />
          <Frame16 />
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function FlatColorIconsGoogle2() {
  return (
    <div
      className="relative shrink-0 size-6"
      data-name="flat-color-icons:google"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="flat-color-icons:google">
          <path
            d={svgPaths.p2b76a300}
            fill="var(--fill-0, #1E1E1E)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Check2() {
  return (
    <div className="relative shrink-0 size-5" data-name="Check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Check">
          <path
            d={svgPaths.p3ebcc080}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <FlatColorIconsGoogle2 />
      <Check2 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-full">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] relative shrink-0 text-[#1e1e1e] text-[16px] w-full">
        <p className="block leading-[normal]">Market Research</p>
      </div>
      <div className="font-['Serotiva:Regular',_sans-serif] relative shrink-0 text-[10px] text-neutral-500 w-full">
        <p className="block leading-[normal]">
          Conduct thorough competitor analysis for Zehn Rebranding
        </p>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Zehn Rebranding</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard2() {
  return (
    <div
      className="bg-[#fff5ed] h-[150px] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col h-[150px] items-end justify-between p-[12px] relative w-full">
          <Frame30 />
          <Frame31 />
          <Frame32 />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-center p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">All tasks</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard3() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[17px] items-end justify-start px-3 py-6 relative w-full">
          <Frame33 />
        </div>
      </div>
    </div>
  );
}

function TaskCards() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Task Cards"
    >
      <TaskGlimpseCard />
      <TaskGlimpseCard1 />
      <TaskGlimpseCard2 />
      <TaskGlimpseCard3 />
    </div>
  );
}

function TaskDashboard() {
  return (
    <div
      className="basis-0 bg-[#ffffff] box-border content-stretch flex flex-col gap-6 grow items-end justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Task Dashboard"
    >
      <Frame18 />
      <Frame6 />
      <TaskCards />
    </div>
  );
}

function Frame34() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[20px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Teams</p>
      </div>
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #1E1E1E)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Check3() {
  return (
    <div className="relative shrink-0 size-5" data-name="Check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Check"></g>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <Check3 />
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#efeef4] relative rounded-[15px] shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[6px] relative">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              5 new messages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-left text-neutral-500 text-nowrap">
        <p className="block leading-[normal] whitespace-pre">6:45 PM</p>
      </div>
      <Frame26 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left w-full">
        <p className="block leading-[normal]">Design Team</p>
      </div>
      <Frame27 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Open team chat</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard4() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-end justify-start p-[12px] relative w-full">
          <Frame35 />
          <Frame36 />
          <Frame37 />
        </div>
      </div>
    </div>
  );
}

function Check4() {
  return (
    <div className="relative shrink-0 size-5" data-name="Check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Check"></g>
      </svg>
    </div>
  );
}

function Frame38() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <Check4 />
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[#efeef4] relative rounded-[15px] shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[6px] relative">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              15+ new messages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-left text-neutral-500 text-nowrap">
        <p className="block leading-[normal] whitespace-pre">6:45 PM</p>
      </div>
      <Frame39 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left w-full">
        <p className="block leading-[normal]">Sales Team</p>
      </div>
      <Frame40 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Open team chat</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard5() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-end justify-start p-[12px] relative w-full">
          <Frame38 />
          <Frame41 />
          <Frame42 />
        </div>
      </div>
    </div>
  );
}

function Check5() {
  return (
    <div className="relative shrink-0 size-5" data-name="Check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Check"></g>
      </svg>
    </div>
  );
}

function Frame43() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <Check5 />
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-[#efeef4] opacity-50 relative rounded-[15px] shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[6px] relative">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(30,30,30,0.5)] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              No new messages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-left text-neutral-500 text-nowrap">
        <p className="block leading-[normal] whitespace-pre">6:45 PM</p>
      </div>
      <Frame44 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left w-full">
        <p className="block leading-[normal]">Finance Team</p>
      </div>
      <Frame45 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Open team chat</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard6() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-end justify-start p-[12px] relative w-full">
          <Frame43 />
          <Frame46 />
          <Frame47 />
        </div>
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-center p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">All tasks</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard7() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[17px] items-end justify-start px-3 py-6 relative w-full">
          <Frame48 />
        </div>
      </div>
    </div>
  );
}

function TaskCards1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Task Cards"
    >
      <TaskGlimpseCard4 />
      <TaskGlimpseCard5 />
      <TaskGlimpseCard6 />
      <TaskGlimpseCard7 />
    </div>
  );
}

function TaskDashboard1() {
  return (
    <div
      className="basis-0 bg-[#ffffff] box-border content-stretch flex flex-col gap-6 grow items-end justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Task Dashboard"
    >
      <Frame34 />
      <TaskCards1 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="box-border content-stretch flex flex-row gap-6 items-start justify-start p-0 relative shrink-0 w-full">
      <TaskDashboard />
      <div
        className="flex items-center justify-center relative self-stretch shrink-0"
        style={
          {
            "--transform-inner-width": "678",
            "--transform-inner-height": "1004",
            width:
              "calc(1px * ((var(--transform-inner-height) * 1) + (var(--transform-inner-width) * 0)))",
          } as React.CSSProperties
        }
      >
        <div className="flex-none h-full rotate-[90deg]">
          <div className="h-full relative w-[678px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 678 1"
              >
                <line
                  id="Line 1"
                  stroke="var(--stroke-0, #EFEEF4)"
                  x2="678"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <TaskDashboard1 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="basis-0 bg-[#ffffff] grow max-w-[600px] min-h-px min-w-px relative rounded-[15px] shrink-0">
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start max-w-inherit p-[24px] relative w-full">
          <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[40px] text-left w-[340px]">
            <p className="block leading-[normal]">Projects</p>
          </div>
          <Frame29 />
        </div>
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[20px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Client Meetings</p>
      </div>
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #1E1E1E)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function DateFilterButton5() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-[15px] shrink-0"
      data-name="Date Filter Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-6 py-3 relative w-full">
          <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#afa8c7] text-[16px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DateFilterButton6() {
  return (
    <div
      className="basis-0 bg-[#1e1e1e] grow min-h-px min-w-px relative rounded-[15px] shrink-0"
      data-name="Date Filter Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-6 py-3 relative w-full">
          <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Tomorrow</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="box-border content-stretch flex flex-row gap-3 items-center justify-center p-0 relative shrink-0 w-full">
      <DateFilterButton5 />
      <DateFilterButton6 />
    </div>
  );
}

function LogosGoogleMeet() {
  return (
    <div
      className="absolute h-[16.484px] left-0.5 top-[3.758px] w-5"
      data-name="logos:google-meet"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 17"
      >
        <g clipPath="url(#clip0_1_1153)" id="logos:google-meet">
          <path
            d={svgPaths.p11f60b80}
            fill="var(--fill-0, #00832D)"
            id="Vector"
          />
          <path
            d={svgPaths.p3d7daf00}
            fill="var(--fill-0, #0066DA)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p3b74d000}
            fill="var(--fill-0, #E94235)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p3893050}
            fill="var(--fill-0, #2684FC)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p1c2e1180}
            fill="var(--fill-0, #00AC47)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p1fe89600}
            fill="var(--fill-0, #00AC47)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p1bdbb500}
            fill="var(--fill-0, #FFBA00)"
            id="Vector_7"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_1153">
            <rect fill="white" height="16.4844" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FlatColorIconsGoogle3() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-6"
      data-name="flat-color-icons:google"
    >
      <LogosGoogleMeet />
    </div>
  );
}

function Check6() {
  return (
    <div className="relative shrink-0 size-5" data-name="Check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Check"></g>
      </svg>
    </div>
  );
}

function Frame50() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <FlatColorIconsGoogle3 />
      <Check6 />
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="bg-[#efeef4] relative rounded-[15px] shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[6px] relative">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">3h 45m left</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-left text-neutral-500 text-nowrap">
        <p className="block leading-[normal] whitespace-pre">6:45 PM</p>
      </div>
      <Frame51 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left w-full">
        <p className="block leading-[normal]">Consultation - Zehn</p>
      </div>
      <Frame52 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Open Meeting</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard8() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-end justify-start p-[12px] relative w-full">
          <Frame50 />
          <Frame53 />
          <Frame54 />
        </div>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-center p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">All meetings</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard9() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[17px] items-end justify-start px-3 py-6 relative w-full">
          <Frame55 />
        </div>
      </div>
    </div>
  );
}

function TaskCards2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Task Cards"
    >
      <TaskGlimpseCard8 />
      <TaskGlimpseCard9 />
    </div>
  );
}

function TaskDashboard2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-end justify-start min-h-px min-w-px p-0 relative rounded-[20px] shrink-0"
      data-name="Task Dashboard"
    >
      <Frame49 />
      <Frame19 />
      <TaskCards2 />
    </div>
  );
}

function Frame56() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[20px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          Client Stage Updates
        </p>
      </div>
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #1E1E1E)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function DateFilterButton7() {
  return (
    <div
      className="basis-0 bg-[#1e1e1e] grow min-h-px min-w-px relative rounded-[15px] shrink-0"
      data-name="Date Filter Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-6 py-3 relative w-full">
          <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Latest</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DateFilterButton8() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-[15px] shrink-0"
      data-name="Date Filter Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-6 py-3 relative w-full">
          <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#afa8c7] text-[16px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Upcoming</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="box-border content-stretch flex flex-row gap-3 items-center justify-center p-0 relative shrink-0 w-full">
      <DateFilterButton7 />
      <DateFilterButton8 />
    </div>
  );
}

function Check7() {
  return (
    <div className="relative shrink-0 size-5" data-name="Check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Check"></g>
      </svg>
    </div>
  );
}

function Frame58() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <Check7 />
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Stages() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Stages"
    >
      <div className="relative shrink-0 size-5">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <circle
            cx="10"
            cy="10"
            fill="var(--fill-0, white)"
            id="Ellipse 2"
            r="9.5"
            stroke="var(--stroke-0, #EFEEF4)"
          />
        </svg>
      </div>
      <div className="relative shrink-0 size-5">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <circle
            cx="10"
            cy="10"
            fill="var(--fill-0, white)"
            id="Ellipse 2"
            r="9.5"
            stroke="var(--stroke-0, #EFEEF4)"
          />
        </svg>
      </div>
      <div className="relative shrink-0 size-5">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <circle
            cx="10"
            cy="10"
            fill="var(--fill-0, #9747FF)"
            id="Ellipse 3"
            r="10"
          />
        </svg>
      </div>
      <div className="relative shrink-0 size-5">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <circle
            cx="10"
            cy="10"
            fill="var(--fill-0, white)"
            id="Ellipse 2"
            r="9.5"
            stroke="var(--stroke-0, #EFEEF4)"
          />
        </svg>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="bg-[#e6d3ff] relative rounded-[15px] shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[6px] relative">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#9747ff] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Deal Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
      <Frame59 />
      <div
        className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[normal]">Zehn - Branding</p>
      </div>
      <div
        className="font-['Serotiva:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[10px] text-left text-neutral-500"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[normal]">6:45 PM</p>
      </div>
      <div
        className="font-['Serotiva:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[10px] text-left text-neutral-500"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[normal]">Updated by: @salesmember1</p>
      </div>
    </div>
  );
}

function ClientStages() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1.5 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Client Stages"
    >
      <Stages />
      <Frame60 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Open Client</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard10() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-end justify-start p-[12px] relative w-full">
          <Frame58 />
          <ClientStages />
          <Frame61 />
        </div>
      </div>
    </div>
  );
}

function Check8() {
  return (
    <div className="relative shrink-0 size-5" data-name="Check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Check"></g>
      </svg>
    </div>
  );
}

function Frame62() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <Check8 />
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Stages1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Stages"
    >
      <div className="relative shrink-0 size-5">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <circle
            cx="10"
            cy="10"
            fill="var(--fill-0, white)"
            id="Ellipse 2"
            r="9.5"
            stroke="var(--stroke-0, #EFEEF4)"
          />
        </svg>
      </div>
      <div className="relative shrink-0 size-5">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <circle
            cx="10"
            cy="10"
            fill="var(--fill-0, #FFBA00)"
            id="Ellipse 1"
            r="10"
          />
        </svg>
      </div>
      <div className="relative shrink-0 size-5">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <circle
            cx="10"
            cy="10"
            fill="var(--fill-0, white)"
            id="Ellipse 2"
            r="9.5"
            stroke="var(--stroke-0, #EFEEF4)"
          />
        </svg>
      </div>
      <div className="relative shrink-0 size-5">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <circle
            cx="10"
            cy="10"
            fill="var(--fill-0, white)"
            id="Ellipse 2"
            r="9.5"
            stroke="var(--stroke-0, #EFEEF4)"
          />
        </svg>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="bg-[#fff0c7] relative rounded-[15px] shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[6px] relative">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#ffba00] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              Consultation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
      <Frame63 />
      <div
        className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[normal]">AnotherBrand - Branding</p>
      </div>
      <div
        className="font-['Serotiva:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[10px] text-left text-neutral-500"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[normal]">5:20 PM</p>
      </div>
      <div className="font-['Serotiva:Regular',_sans-serif] h-3.5 leading-[0] not-italic relative shrink-0 text-[10px] text-left text-neutral-500 w-[248px]">
        <p className="block leading-[normal]">Updated by: @salesmember2</p>
      </div>
    </div>
  );
}

function ClientStages1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1.5 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Client Stages"
    >
      <Stages1 />
      <Frame64 />
    </div>
  );
}

function Frame65() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Open Client</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard11() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-end justify-start p-[12px] relative w-full">
          <Frame62 />
          <ClientStages1 />
          <Frame65 />
        </div>
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-center p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">All updates</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard12() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[17px] items-end justify-start px-3 py-6 relative w-full">
          <Frame66 />
        </div>
      </div>
    </div>
  );
}

function TaskCards3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Task Cards"
    >
      <TaskGlimpseCard10 />
      <TaskGlimpseCard11 />
      <TaskGlimpseCard12 />
    </div>
  );
}

function ClientStageUpdates() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-end justify-start min-h-px min-w-px p-0 relative rounded-[20px] shrink-0"
      data-name="Client Stage Updates"
    >
      <Frame56 />
      <Frame57 />
      <TaskCards3 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[20px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Tickets</p>
      </div>
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #1E1E1E)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Envelope() {
  return (
    <div className="relative shrink-0 size-6" data-name="Envelope">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Envelope">
          <path
            d={svgPaths.p932f410}
            fill="var(--fill-0, #1E1E1E)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame68() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <Envelope />
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="bg-[#fdbfba] relative rounded-[15px] shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[6px] relative">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#ff3d00] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              Priority: High
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="box-border content-stretch flex flex-row font-['Serotiva:Regular',_sans-serif] items-start justify-between leading-[0] not-italic p-0 relative shrink-0 text-[10px] text-left text-neutral-500 text-nowrap w-full">
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          The logo needs revision...
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          6:45 PM
        </p>
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left w-full">
        <p className="block leading-[normal]">Fazal Rahman</p>
      </div>
      <Frame25 />
    </div>
  );
}

function ClientStages2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1.5 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Client Stages"
    >
      <div
        className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#1e1e1e] text-[12px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[normal]">Project: Zehn - Branding</p>
      </div>
      <Frame69 />
      <Frame70 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Open Ticket</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard13() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-end justify-start p-[12px] relative w-full">
          <Frame68 />
          <ClientStages2 />
          <Frame71 />
        </div>
      </div>
    </div>
  );
}

function WhatsappLogo() {
  return (
    <div className="relative shrink-0 size-6" data-name="WhatsappLogo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="WhatsappLogo">
          <path
            d={svgPaths.p36455f00}
            fill="var(--fill-0, #1E1E1E)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame72() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <WhatsappLogo />
      <div className="relative shrink-0 size-5" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 20"
        >
          <path
            d={svgPaths.p86a1180}
            fill="var(--fill-0, #AFA8C7)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="bg-[#ffe0c7] relative rounded-[15px] shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[6px] relative">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#ff9643] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              Priority: Medium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame74() {
  return (
    <div className="box-border content-stretch flex flex-row font-['Serotiva:Regular',_sans-serif] items-start justify-between leading-[0] not-italic p-0 relative shrink-0 text-[10px] text-left text-neutral-500 text-nowrap w-full">
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          Send logo SVG
        </p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          6:45 PM
        </p>
      </div>
    </div>
  );
}

function Frame75() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left w-full">
        <p className="block leading-[normal]">Ismail Mahamood</p>
      </div>
      <Frame74 />
    </div>
  );
}

function ClientStages3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1.5 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Client Stages"
    >
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          Project: Blop Website
        </p>
      </div>
      <Frame73 />
      <Frame75 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[10px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Open Ticket</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard14() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-end justify-start p-[12px] relative w-full">
          <Frame72 />
          <ClientStages3 />
          <Frame76 />
        </div>
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-center p-0 relative shrink-0 w-full">
      <div className="font-['Serotiva:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">All tickets</p>
      </div>
    </div>
  );
}

function TaskGlimpseCard15() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[15px] shrink-0 w-full"
      data-name="Task Glimpse Card"
    >
      <div className="absolute border border-[#efeef4] border-solid inset-0 pointer-events-none rounded-[15px]" />
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[17px] items-end justify-start px-3 py-6 relative w-full">
          <Frame77 />
        </div>
      </div>
    </div>
  );
}

function TaskCards4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Task Cards"
    >
      <TaskGlimpseCard13 />
      <TaskGlimpseCard14 />
      <TaskGlimpseCard15 />
    </div>
  );
}

function ClientStageUpdates1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-end justify-start min-h-px min-w-px p-0 relative rounded-[20px] shrink-0"
      data-name="Client Stage Updates"
    >
      <Frame67 />
      <TaskCards4 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="box-border content-stretch flex flex-row gap-6 items-start justify-start p-0 relative shrink-0 w-full">
      <TaskDashboard2 />
      <div
        className="flex items-center justify-center relative self-stretch shrink-0"
        style={
          {
            "--transform-inner-width": "586",
            "--transform-inner-height": "1410",
            width:
              "calc(1px * ((var(--transform-inner-height) * 1) + (var(--transform-inner-width) * 0)))",
          } as React.CSSProperties
        }
      >
        <div className="flex-none h-full rotate-[90deg]">
          <div className="h-full relative w-[586px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 586 1"
              >
                <line
                  id="Line 1"
                  stroke="var(--stroke-0, #EFEEF4)"
                  x2="586"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ClientStageUpdates />
      <div
        className="flex items-center justify-center relative self-stretch shrink-0"
        style={
          {
            "--transform-inner-width": "586",
            "--transform-inner-height": "1410",
            width:
              "calc(1px * ((var(--transform-inner-height) * 1) + (var(--transform-inner-width) * 0)))",
          } as React.CSSProperties
        }
      >
        <div className="flex-none h-full rotate-[90deg]">
          <div className="h-full relative w-[586px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 586 1"
              >
                <line
                  id="Line 1"
                  stroke="var(--stroke-0, #EFEEF4)"
                  x2="586"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ClientStageUpdates1 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Serotiva:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[40px] text-left w-[340px]">
        <p className="block leading-[normal]">Clients</p>
      </div>
      <Frame23 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-[15px] shrink-0">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-[24px] relative w-full">
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start px-[25px] py-0 relative w-full">
          <Frame28 />
          <Frame22 />
        </div>
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <Frame12 />
      <Frame20 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
      <Frame9 />
      <Frame78 />
    </div>
  );
}

export default function MacBookPro163() {
  return (
    <div
      className="bg-[#efeef4] box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="MacBook Pro 16' - 3"
    >
      <Frame4 />
      <Frame11 />
    </div>
  );
}