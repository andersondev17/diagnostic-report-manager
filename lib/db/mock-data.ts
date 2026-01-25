import {
    IconCamera,
    IconDashboard,
    IconFileAi,
    IconFileDescription,
    IconFolder,
    IconHelp,
    IconReport,
    IconSearch,
    IconSettings
} from "@tabler/icons-react";

export const recentReports: TReport[] = [
    {
        "id": 1,
        "name": "vibration_analysis_01.pdf",
        "size": "2.4MB",
        "type": "Vibration",
        "date": "2023-10-01",
        "status": "Completed"
    },
    {
        "id": 2,
        "name": "motor_thermal_B.csv",
        "size": "1.1MB",
        "type": "Thermal",
        "date": "2023-10-02",
        "status": "Completed",
    }
    
];


export const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Companion', href: '/companions' },
    { label: 'My Journey', href: '/my-journey' }
]


export const data = {
    user: {
        name: "Jhon Doe",
        email: "dHcQ2@example.com",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: IconDashboard,
        },
        {
            title: "Projects",
            url: "#",
            icon: IconFolder,
        },
    ],
    navClouds: [
        {
            title: "Capture",
            icon: IconCamera,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Proposal",
            icon: IconFileDescription,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Prompts",
            icon: IconFileAi,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "Get Help",
            url: "#",
            icon: IconHelp,
        },
        {
            title: "Search",
            url: "#",
            icon: IconSearch,
        },
    ],
    documents: [

        {
            name: "Reports",
            url: "#",
            icon: IconReport,
        },

    ],
}