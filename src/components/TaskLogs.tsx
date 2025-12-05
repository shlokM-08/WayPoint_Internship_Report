import { useState } from 'react';
import './TaskLogs.css';

interface TaskLog {
  date: string;
  hours: string;
  tasks: string[];
}

const taskLogsData: TaskLog[] = [
  {
    date: '07/10/25',
    hours: '8AM - 6.15PM',
    tasks: [
      'familiarize yourself with the codebase and setup the mongodb to make urself ready to dev.'
    ]
  },
  {
    date: '08/10/25',
    hours: '8AM - 11.25PM',
    tasks: [
      'add prompt categories UI to split prompts into certain categories.',
      'Actually use the API for it.',
      'Introduction to AWS and setup done.',
      'First successful push to dev.waypoint'
    ]
  },
  {
    date: '09/10/25',
    hours: '8AM - 3PM || 5.30PM - 10.30PM',
    tasks: [
      'Updating Dev on Cloud',
      'Made new UI for Dashboard and Brand(categories, visibility specifically) -sent for PR, told to cancel PR and revert back to old dev branch to focus on adding in more functionality instead of focusing on UI.',
      'added share mentions to the citations page.',
      'Setup Backend'
    ]
  },
  {
    date: '10/10/25',
    hours: '8AM - 6PM',
    tasks: [
      'Added in SoV for Old UI now version is ready.',
      'Worked on UI made the citations page pixel perfect.',
      'Started Working on Visibility Page where Voice Share Leaders, Share of Voice values are complete.'
    ]
  },
  {
    date: '11/10/25',
    hours: '8AM - 6.30PM',
    tasks: [
      'Pushed 1.4 into Prod',
      'Worked on new UI made pixel perfect citations page and visibilty page.',
      'citations page and visibilty page put in all the data that could be imported.'
    ]
  },
  {
    date: '12/10/25',
    hours: '8AM - 7.35PM',
    tasks: [
      'Started work on New UI debugging majorly',
      'Finalized the visibility page to completion',
      'Finalized prompt page to completion',
      'Made and imported citation page',
      'Made and imported Platform page',
      'Imported and made accurate but not pixel perfect Figma UI for citations and platform'
    ]
  },
  {
    date: '15/10/25',
    hours: '8AM - 5.30PM',
    tasks: [
      'Added in favicons for every brand dynamically',
      'Well padded sentiment by platform page',
      '7day 30 day pill added to filtering'
    ]
  },
  {
    date: '16/10/25',
    hours: '8AM - 6PM',
    tasks: [
      'Whenever a company logo fails to get fetched, use the first letter fallback that we had before',
      'We will be working on the historical data part and all the UI component needed for that.',
      'First you need to study how the tracker API works. It has a force parameter which swaps the current metrics with whatever you get in new run',
      'You need to call this force tracking, generate a new set of metrics in the userconfig.visualmetrics',
      'Then find the old ones (which got swapped) from db, and manually replace the XXXXXXX_historical_X keys for it.',
      'For example, in company_metrics, currently historical is emtpy, you need to shift the current id in company_metrics to company_metrics_historical_1 and then run force and get the new value in company_metrics. Repeat that till you populate all historical 1,2 and 3.',
      'Then on FE, this dropdown below comes from a component called history.tsx, and there will be 4 values in (currently 3). This week, Last Week, Last Month, Last 3 Months',
      'This week is regular key ie like company_metrics, last week is historical_1, last month is historical_2 and last 3 is historical 3',
      'END GOAL: When user switches from current week to last week, he should see last weeks data in ALL the pages where history.tsx dropdown is used',
      '4. Share of voice on FE Visibility page is currently average of SoV for all LLMs for the brand company, instead use sum. Sum is already used in the leaderboards.tsx page in visibility subsection'
    ]
  },
  {
    date: '17/10/25',
    hours: '8AM - 6PM',
    tasks: [
      'Make a new branch from dev',
      'Changed all favicons to Figma accurate favicons for full brand page tabs.',
      'Added more spacing in visibility rankings by topic.',
      'Made UI Skeleton for Region Page with interactive and dynamic map as per Figma.',
      'Made Shopping page as per Figma'
    ]
  },
  {
    date: '18/10/25',
    hours: '8AM - 5.30PM',
    tasks: [
      'Made Personas Page, raised queries regarding the UI.',
      'Did ad-hoc and research into how to go about making a payments platform integration for WayPoint.'
    ]
  },
  {
    date: '21/10/25',
    hours: '8AM - 6PM',
    tasks: [
      'Finish Personas with finalized changes.',
      'Made Agent Analytics sidebar.',
      'Setup Tabs for Agent Analytics.',
      'Overview Page completed except of filtering header.'
    ]
  },
  {
    date: '22/10/25',
    hours: '8AM - 5.45PM',
    tasks: [
      'Debugging the Reports; didn\'t complete due to merge not complete on Dev.',
      'Finding relevant prompt for a vendor to increase awareness of brand when searching in prompts; found 14.',
      'Completed the Add New Site Page in agent analytics.',
      'Completed Bot Visits Page in agent analytics.'
    ]
  },
  {
    date: '23/10/25',
    hours: '8AM - 6PM',
    tasks: [
      'Complete page UI for Overview.',
      'Complete page UI for Pages.',
      'Complete page UI for Bot Visits.'
    ]
  },
  {
    date: '24/10/25',
    hours: '8AM - 5.35PM',
    tasks: [
      'Complete page UI for Human Visits.',
      'Complete page UI for Logs.',
      'Complete page UI for Settings.',
      'Debugged dev.waypoint shopping page error(rendering and merging issues).',
      'Debugged platform page(infinite loop of render for platform performance table that led to page crashing on local).'
    ]
  },
  {
    date: '25/10/25',
    hours: '8AM - 6PM',
    tasks: [
      'View Bots Page.',
      'Redesigned UI for it; keeping UX in mind and ensuring consistency across the board.',
      'Final checks and runs done for agent analytics page.',
      'Sent Agent Analytics page for PR.'
    ]
  },
  {
    date: '27/10/25',
    hours: '8AM - 6PM',
    tasks: [
      'Merge Conflict on PR made for agent analytics page.',
      'Unimported all Filters to clean up UI for demo.',
      'Changed LogoBox bg colour to white.'
    ]
  },
  {
    date: '28/10/25',
    hours: '8AM - 6PM',
    tasks: [
      'Verified backend code to make structure similar to whats required when endpoints are called in .',
      'UI beautifications according to product fit and requirements.'
    ]
  },
  {
    date: '29/10/25',
    hours: '8AM - 6PM',
    tasks: [
      'Integrated BE into agent analytics page[Overview, Bot details, Pages, Bot Visits, Human Visits, Logs] .',
      'Debugged and redesigned UI to accommodate data(Since Figma didn\'t give a clear picture of what to really show).',
      '6 Pages integration and data loading done for.'
    ]
  },
  {
    date: '30/10/25',
    hours: '8AM - 7PM || 8.30PM - 2.05AM',
    tasks: [
      'Verified Data gets loaded fresh from BE on a daily basis.',
      'Redesigning UI and making it complete to push to dev.',
      'Graphs and even table data displaying updated to match UI standards that are required.',
      'Code review and implementation review done with recommended changes.',
      'Added in recommended changes.',
      'Raised PR for agent analytics page.',
      'Fixed seeding of agent analytics.',
      'Rehauled entire UI for agent analytics overnight to make changes that include:',
      'Dropdown for which company analytics, and show empty list when selected-',
      'Hide Current period and Compare bots-',
      'For Pages - use brand UI table, shift view more to top right-',
      'For Platforms,use brand UI table, make view more area compact. Views and Share - improve UI-',
      'Remove Bing from platforms tables-',
      '4 and 5 same for Bot Types-',
      'Show X axis and Y axis always-',
      'Fix value orientation in the table-',
      'Remove Export in Pages-',
      'For bot visits, same thing as overview-',
      'Remove pagination from Platforms in Bot visits-',
      'For human visits, same thing as bot visits-',
      'Sharp edges for all the graphs-',
      'Change sidebar to overview brand and analytics-'
    ]
  },
  {
    date: '03/11/25',
    hours: '8AM - 6PM',
    tasks: [
      'Debugged dev.waypoint where it wasn\'t showing analytics page(Import Issues occurred during merge of PRs).',
      'KT given to Anup regarding what the product does, how the integration works for analytics page and a walkthrough of all existent working API calls for analytics to make sure he understands the product requirement and development requirement of how to store what data.',
      'Started looking at analytics page of Profound and finding ways to structure and execute onboarding for the brands agent analytics using GA4, sent over recommendations to Dhvanil .'
    ]
  },
  {
    date: '05/11/25',
    hours: '8AM - 6PM',
    tasks: [
      'Removed average response time, add new site and settings (removed from render for both of these last 2) from UI for bot details.',
      'Set up UI configuration for google analytics page; as per requirement.',
      'UI changes to config google analytics and edited domain name for agent analytics; removed the dropdown option.',
      'Need to change settings to suit the options of what we added in config time for google analytics.',
      'Recommended changes of changing SVG to coded out components for view more and config google analytics done too.'
    ]
  },
  {
    date: '06/11/25',
    hours: '8AM - 5.30PM',
    tasks: [
      'Minor UI tweaks to analytics page(waiting for BE to be ready so that i can integrate GA4).',
      'Testing out beta versions of dark mode and light mode(so far not that great need to approach more holistically and in a more scalable manner).'
    ]
  },
  {
    date: '07/11/25',
    hours: '7.45AM - 6PM',
    tasks: [
      'Integrate GA4 measurement API to pop up in analytics page(users can add in their own config to it now and it will be pushed to DB).',
      'Integrated GA4 API call to settings to ensure users can edit any data for it and save it.',
      'Polished popup functionality to make sure only when any value of measurement id or API secret or property id is missing it will pop up otherwise it will remain hidden.'
    ]
  },
  {
    date: '08/11/25',
    hours: '8AM - 6.20PM',
    tasks: [
      'Changed workflow of login page; now user can onboard himself(functionality wise complete on FE).',
      'fixed minor delay in config pop up in analytics page.',
      'Added OTP verification to sign up page and also a check to see if user already exists or not.',
      'Changed user flow now its login-> don\'t have account sign up->enter email->verify OTP->onboarding process->directed straight to dashboard of user.',
      'All changes pushed to dev regarding analytics and onboarding.',
      'Feedback recieved and made the following changes',
      'Fixed settings backdrop import issue.',
      'now its /signup instead of login/signup.',
      'UI for onboarding changed to figma lookalike.',
      'Removed SVGs.',
      'fixed up api calling link and API_BASE_URL.',
      'Tested on dev and added back in OTP on signup.'
    ]
  },
  {
    date: '10/11/25',
    hours: '8AM - 6.45PM',
    tasks: [
      'Tested and noticed crucial bugs on dev and prod.',
      'Debugged APIs calling with anup and even system workflow and design.',
      'Debugged API calling on frontend and isolated issue.',
      'New API integration and stablizing branch to push to dev and prod.',
      'All bugs fixed.'
    ]
  },
  {
    date: '11/11/25',
    hours: '8AM - 6PM',
    tasks: [
      'UI changes made to settings page in analytics.',
      'history.tsx dropdown added to all relevant pages in analytics.',
      'Verified BE implementation to suit FE integration.',
      'Integrated FE and BE and history.tsx for overview page and set system in place to import them.'
    ]
  },
  {
    date: '12/11/25',
    hours: '8AM - 7PM',
    tasks: [
      'Tested prod and found bugs when populating pre-existent accounts, addressed them on BE.',
      'Implemented history.tsx integration on bot details, bot visits, pages, human visits & logs.',
      'Tested with new account and existent account to make sure smooth onboarding happens.',
      'Added Loading UI for all tabs in analytics page to ensure that smooth UX.',
      'Debugged settings onboarding of GA4 client credentials to let them onboard from settings page.'
    ]
  },
  {
    date: '13/11/25',
    hours: '8AM - 6.15PM',
    tasks: [
      'Changed UI for signup and try to ensure smoother customer journey.',
      'Redesigned signup for Profile, tracking, Products and even Regions.',
      'Helped smoothen out BE functionality and verified smooth flow of APIs with anup.',
      'Sent PR for signup.'
    ]
  },
  {
    date: '14/11/25',
    hours: '8AM - 4.15PM',
    tasks: [
      'Researching and checking out tech audit feature of trackr.ai.',
      'Ideating and testing UI design for WayPoint tech audit feature to suit our component and userflow requirements.',
      'Designed rough skeleton of tech audit and how its tabs should be placed.',
      'Designed tech_audit/overview Page and made resuable components for it.'
    ]
  },
  {
    date: '15/11/25',
    hours: '8AM - 5.35PM',
    tasks: [
      'Researching and checking out tech audit feature of trackr.ai.',
      'Trying to understand how tech audit fits into our context trying to makeup mockup data to populate pages to simulate how the page would look once data is added.',
      'Design renditions on tech_audit/overview Page to suit WayPoint UI requirements and standardizing the user flow and UX to make it seem like part of one website.'
    ]
  },
  {
    date: '17/11/25',
    hours: '8AM - 5.35PM',
    tasks: [
      'Wrapped up and pushed the tech audit page.',
      'UI redesigns and final touches added to smoothen out the design and user flow.'
    ]
  },
  {
    date: '18/11/25',
    hours: '8AM - 11PM',
    tasks: [
      'Integrated tech-audit API.',
      'Internal Server Errors in API due to undisclosed bug,attemped debugging it.',
      'Made error handling changes to FE to load skeleton even when API content fetching fails.',
      'Debugging BE with anup to better understand depth of error.',
      'Integrated 4 new APIs to simulate tech_audit population of data better.',
      'Updated Util to smoothen out the onboarding and optimize onboarding of tech audit.',
      'Integrated data points into FE and v1 of tech audit complete.'
    ]
  },
  {
    date: '19/11/25',
    hours: '8AM - 6.30PM',
    tasks: [
      'Debugged and fixed tech audit page .',
      'Organized relatively scrambled data to call on FE.',
      'Debugged signup page and added in add competitor feature.',
      'Fixed and propped up analytics page as there was an error in  it.',
      'Finalized design changes and UI updates required in tech audit page.'
    ]
  },
  {
    date: '20/11/25',
    hours: '7AM - 5.30PM',
    tasks: [
      'Isolated and replicated prod bug on local env[APIs type were updated from GET to POST and FE still was using GET].',
      'Re-Integrated all APIs of analytics page and changed its util to work with POST APIs instead of GET APIs and resolved bug completely.',
      'Made a PR for the bug fix.',
      'Updated UI for technical audit.',
      'added functionality to buttons on overview.',
      'Updated UI for high priority actions for overview tab in tech audit; removed confidence and importance score and added new UI to accommodate affected URLs.',
      'Rehauled entire UI for actions tab and made all recommended changes.',
      'Made UI changes to highlights pill of technical tab to adjust for better UI for incoming data.'
    ]
  },
  {
    date: '21/11/25',
    hours: '8AM - 5.30PM',
    tasks: [
      'Adding Loading state and better error handling for empty data in Brand Page for all tabs.',
      'Designed and developed a New Modal for tech audit for better UX.',
      'Verified citation links using subset of data from citations page in brand page, to fix non working citation links.',
      'Made Documentation for technical audit page; for tabs Overview and Actions.'
    ]
  },
  {
    date: '22/11/25',
    hours: '8AM - 7PM',
    tasks: [
      'Integrated all new APIs and safely removed older APIs present in technical audit page.',
      'Redesigned how data is read with new API call schema.',
      'Fixed config issue of older design configs for analytics.',
      'default landing page is now overview.',
      'default flag functionality added on FE for regions; BE needs little mod in config.',
      'modals added in tech audit making it informative only and a button once u close modal.',
      'made modal for brand and a skeleton for visibility page.',
      'made an informative modal for overview page.'
    ]
  },
  {
    date: '24/11/25',
    hours: '8AM - 6PM',
    tasks: [
      'Debugged brand page loading, modal logic for overview and for brand.',
      'Debugged modal logic and tightened analytics page data fetching.',
      'Integrated New APIs to create persona and create region and create product.',
      'Wrote logic and called APIs to fetch prompts and let persona and prompts be interlinked.',
      'Wrote logic and called APIs to fetch prompts and let region and prompts be interlinked.',
      'removed product and persona setup from signup for user.',
      'Tech_audit now only runs on clicking run tech audit no time else .'
    ]
  },
  {
    date: '25/11/25',
    hours: '8AM - 9PM',
    tasks: [
      'Analytics page modal doesn\'t close even on clicking X keeps popping up fix that logic test on shlokmehroliya@gmail.com.',
      'customer entities section needs to be removed from onboardingstep2 and a better UI for that step in general.',
      'Product step 5 from onboarding step5 needs to be removed.',
      'Button in step 4 should say continue to your dashboard.',
      'Tech_audit logic again needs to be discussed and finalized.',
      'skeleton for always loading needs to be added in citations.',
      'need to do something abt personas skeleton[or leave as is]; shopping page make it like that of personas.',
      'tech_audit ran by itself again without any prompt from user end; rectify that.',
      'update-product-metrics API needs to be studied and integrated.',
      'Added update-product-metrics to edit products and to add products to update shopping page smoothly.',
      'Overview and Brand Modal changed to keep loading type not informative type.',
      'Made changes to analytics page modal UI.'
    ]
  },
  {
    date: '26/11/25',
    hours: '8AM - 6.30PM',
    tasks: [
      'Redesigned Modals for Overview, Technical Audit and Brand to better suit our UI requirements.',
      'Added in /settings.',
      'Worked on /settings UI structure and pages.',
      'Made Profile, billing and people page.',
      'Setup local syncing in session of user images.',
      'Gathered information of what all new API requirements will be there to make settings page full functional.'
    ]
  },
  {
    date: '28/11/25',
    hours: '8AM - 5.30PM',
    tasks: [
      'Polished up UI in settings page.',
      'Integrated New APIs to help users change and update profile information.',
      'Integrated get user API into /app too to help sync profile icon and profile details.',
      'Worked with user flow of shopping page to help make BE product catalogue integration smoother.',
      'Hid unnecessary pages in settings and aligned sidebar accordingly to accommodate ready pages.'
    ]
  },
  {
    date: '29/11/25',
    hours: '8AM - 10.20PM',
    tasks: [
      'Settings page polished upon more; removed support page from there too.',
      'Integrated new API to scrape and fetch products, even used fetch image URL to display to make UI look neater instead of the default option of no image so far.',
      'Integrated WhatsApp chat help feature in /app so users can reach out for any queries.',
      'Integrated fetching products through analytics API and on FE made UI for it and even protocol to ensure smoothly we are able to onboard all products without hassle.',
      'Protocol made involved as users click add product they\'re API is run but since update metrics has to refresh page i made a protocol so that we queue all the running add products and once all r run then only we can run update metrics and then it refreshes page.'
    ]
  },
  {
    date: '30/11/25',
    hours: '8AM - 1PM || 10PM-1.15AM',
    tasks: [
      'Debugged code to isolate issue of analytics(API call in BE had an error that needed rectification).',
      'Working on UI fixes and user flow fixes recommended.',
      'Added (?) info icons to brand all tabs.',
      'Changed UI for platform performance to a toggle instead of a dropdown.',
      'Aligned div of brand symbol and that of pages.',
      'changed loading page of tech audit once modal is closed to be consistent with analytics page.',
      'Changed default overview values to be --% instead of 0% to make it a better UX.'
    ]
  },
  {
    date: '01/12/25',
    hours: '8AM - 6PM',
    tasks: [
      'Worked on Modal don\'t show again logic; fixed it for analytics, overview and brand.',
      'Changed UI of analytics modal to be consistent with the rest of the UI.',
      'Changed empty state screen for tech audit to match that of analytics to keep consistent flow.',
      'Identified bugs in APIs for huge batch calls and even for adding products on shopping page.',
      'Added (?) info icons for graphs in platforms, added default screen for Personas and Shopping to ensure we can create desired UX.',
      'Rehauled the entire settings page UI to match sidebar and header to be consistent with /app.',
      'Ran safety checks with multiple accounts to ensure UX is maintained in different states of loading and in different states of user flows.'
    ]
  },
  {
    date: '02/12/25',
    hours: '8AM - 5.45PM',
    tasks: [
      'Integrated Notifications et al APIs related to it.',
      'Updated user flow and user-config to actively fetch notifications at same frequency as that of get-user-config; bcz notis are something that we will extensively use to update users on their progress.',
      'Debugged update-geo-tracker API with anup to help better understand the flow of the API since it handles a large volume of data.',
      'Integrated geo-tracker API into FE.',
      'Integrated the geo-tracker button in admin end in reports section to ensure we can update any company id metrics whenever necessary.'
    ]
  },
  {
    date: '03/12/25',
    hours: '8AM - 5.30PM',
    tasks: [
      'new updated-geo-tracker API tested and integrated.',
      'Fixed workflow; now when user has active metrics running but visual metrics initial metrics are already full, we wont be having a loading screen for it instead itll show previous data itself while historical_x gets loaded in.',
      'Raised PR for UI rehaul, notifications, update-geo-tracker features.'
    ]
  },
  {
    date: '04/12/25',
    hours: '8AM - 5.30PM',
    tasks: [
      'Added Resources section into landing page and connected it to the footer of the page.',
      'Integrated google-oauth API into analytics.',
      'User can now configure analytics using google oauth and also the success response screen UI was fixed to be consistent with our UI and help user have a better UX.'
    ]
  }
];

const TaskLogs = () => {
  const [expandedLogs, setExpandedLogs] = useState<Set<number>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  // Group logs by month
  const groupedLogs = taskLogsData.reduce((acc, log, index) => {
    // Parse date: DD/MM/YY format
    const dateParts = log.date.split('/');
    const month = parseInt(dateParts[1], 10);
    
    let monthKey: string;
    if (month === 10) {
      monthKey = 'October';
    } else if (month === 11 || month === 12) {
      monthKey = 'November & December';
    } else {
      monthKey = 'Other';
    }

    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push({ ...log, originalIndex: index });
    return acc;
  }, {} as Record<string, Array<TaskLog & { originalIndex: number }>>);

  const toggleLog = (index: number) => {
    setExpandedLogs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(monthKey)) {
        newSet.delete(monthKey);
      } else {
        newSet.add(monthKey);
      }
      return newSet;
    });
  };

  return (
    <div className="task-logs-container">
      <h1 className="logs-title">Task Logs</h1>
      <div className="logs-wrapper">
        {Object.entries(groupedLogs).map(([monthKey, logs]) => {
          const isMonthExpanded = expandedMonths.has(monthKey);

          return (
            <div key={monthKey} className="month-section">
              <button
                onClick={() => toggleMonth(monthKey)}
                className="month-toggle-btn"
              >
                <span className="month-title">{monthKey}</span>
                <span className="month-toggle-icon">
                  {isMonthExpanded ? '▼' : '▶'}
                </span>
              </button>
              
              {isMonthExpanded && (
                <div className="month-logs">
                  {logs.map((log) => {
                    const isExpanded = expandedLogs.has(log.originalIndex);
                    const hasMoreThan4 = log.tasks.length > 4;
                    const displayedTasks = hasMoreThan4 && !isExpanded 
                      ? log.tasks.slice(0, 4) 
                      : log.tasks;

                    return (
                      <div key={log.originalIndex} className="log-entry">
                        <div className="log-header">
                          <h2 className="log-date">Tasks done for {log.date}</h2>
                          <p className="log-hours">Hours committed in QST: {log.hours}</p>
                        </div>
                        <ul className="log-tasks">
                          {displayedTasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="log-task">
                              {task}
                            </li>
                          ))}
                        </ul>
                        {hasMoreThan4 && (
                          <button
                            onClick={() => toggleLog(log.originalIndex)}
                            className="log-load-more-btn"
                          >
                            {isExpanded ? 'Show Less' : `Load More (${log.tasks.length - 4} more)`}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskLogs;

