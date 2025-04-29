// Define Use Cases Data with updated icons from Heroicons (MIT License)

// Product/Marketing: Presentation Chart Bar
const ProductIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12A2.25 2.25 0 0 0 20.25 14.25V3M3.75 21h16.5M16.5 3.75h.008v.008h-.008V3.75Zm-3.75 0h.008v.008h-.008V3.75Zm-3.75 0h.008v.008h-.008V3.75Zm-3.75 0h.008v.008H6.75V3.75Z" />
  </svg>
);

// Researcher: Beaker
const ResearcherIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L4.2 15.3m15.6 0-1.57.393m0 0A9.065 9.065 0 0 1 12 15m6.23-.693L19.8 15.3M12 15a9.065 9.065 0 0 1-6.23-.693M4.2 15.3l1.57-.393M12 15a9.065 9.065 0 0 1 6.23-.693m-12.46 0A9.065 9.065 0 0 1 12 15m-6.23.693L4.2 15.3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.75h12c.621 0 1.125-.504 1.125-1.125V15m-13.5 0v2.625c0 .621.504 1.125 1.125 1.125H18" />
  </svg>
);

// Student: Academic Cap
const StudentIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

// Creator: Video Camera
const CreatorIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
  </svg>
);

// Analyst/Strategist: Chart Bar Square
const MarketerIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V5.25A2.25 2.25 0 0 0 18 3H6A2.25 2.25 0 0 0 3.75 5.25v12.75A2.25 2.25 0 0 0 6 20.25Z" />
  </svg>
);

export const useCasesData = [
  {
    id: 'product-person',
    title: 'Product Managers & Marketers',
    icon: ProductIcon,
    color: '#3B82F6', // Blue
    description: 'Track influencer campaign effectiveness. Set your product name in AutoSearch. Quickly scan 100s of videos – a green tag indicates a mention. Jump instantly via Word Search to the exact moment your product is discussed to assess the context and impact.'
  },
  {
    id: 'researcher',
    title: 'Academic Researchers',
    icon: ResearcherIcon,
    color: '#10B981', // Emerald
    description: 'Accelerate literature reviews and data extraction. Search hours of recorded lectures, interviews, or focus groups for specific keywords, theories, or participant quotes. Export timestamped findings for easy citation and analysis.'
  },
  {
    id: 'student',
    title: 'Students & Lifelong Learners',
    icon: StudentIcon,
    color: '#F59E0B', // Amber
    description: 'Ace your studies by quickly finding information in online courses or lecture recordings. Search for key concepts, definitions, or specific topics mentioned by professors. Review crucial segments without rewatching entire videos.'
  },
  {
    id: 'content-creator',
    title: 'Content Creators & Editors',
    icon: CreatorIcon,
    color: '#8B5CF6', // Violet
    description: 'Streamline your editing workflow. Locate specific soundbites, bloopers, or topic segments within your raw footage or competitor content. Find reusable clips or analyze competitor strategies efficiently.'
  },
  {
    id: 'market-analyst',
    title: 'Market Analysts & Strategists',
    icon: MarketerIcon,
    color: '#EC4899', // Pink
    description: 'Monitor brand mentions, competitor activities, and industry trends across video platforms. Use AutoSearch for brand names and Word Search for specific features or market terms discussed in reviews, news, or conference talks.'
  }
];
