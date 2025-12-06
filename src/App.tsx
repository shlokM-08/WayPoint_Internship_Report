import { CanvasRevealEffect } from './components/ui/canvas-reveal-effect';
import WorkHoursChart from './components/WorkHoursChart';
import ObjectivesAchieved from './components/ObjectivesAchieved';
import TaskLogs from './components/TaskLogs';
import './App.css';

function App() {
  return (
    <div className="app relative min-h-screen w-full">
      {/* Purple Canvas Reveal Effect Background */}
      <div className="fixed inset-0 z-0">
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-black"
          colors={[
            [236, 72, 153],
            [232, 121, 249],
          ]}
          dotSize={2}
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <WorkHoursChart />
        <ObjectivesAchieved />
        <TaskLogs />
      </div>
    </div>
  );
}

export default App;

