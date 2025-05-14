# **App Name**: AR/MR ROI Deep Dive

## Core Features:

- Input Wizard: Multi-step wizard for guided scenario and data entry. Uses a stepper component to show progress.
- Interactive Dashboard: Interactive dashboard displaying key ROI metrics and visualizations (ROI %, annual savings, payback period).
- AI Search Agent: AI search agent interface with chain-of-thought transparency. Shows reasoning steps and source links. It will use tool to find resources that can be included.
- Layout: Persistent header with logo, global search, user menu. Collapsible sidebar for navigation (Home, Dashboard, Study, Search, etc.).
- Feedback Notifications: Loader overlay during API calls. Notification toast for success/failure messages.

## Style Guidelines:

- Mobile-first design with responsive layouts using Tailwind CSS grid and flexbox utilities.
- Use a consistent color scheme throughout the application. Consider using a palette from Tailwind CSS or shadcn/ui.
- Color-coded ROI metrics (green for positive, amber for neutral, red for negative).
- Accent: Teal (#008080) for interactive elements.
- Clear and consistent icons for navigation and actions, following accessibility guidelines.
- Subtle animations for transitions and feedback (e.g., Framer Motion for smooth UX).