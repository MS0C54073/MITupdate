# Bilingual AI Personal Website

## About Me (Project AIM)

This project is a dynamic and interactive personal portfolio website , I am an IT Professional, Software Engineer, and AI Enthusiast. It's designed to showcase a comprehensive overview of my skills, projects, and professional experience.

Key features of this website include:
-   **AI-Powered Translations**: The entire site can be translated into multiple languages in real-time using Google's generative AI.
-   **Dynamic CV Generation**: Visitors can preview or download a professionally formatted CV that is generated on-the-fly from the information on the page.
-   **Interactive UI**: Built with Next.js and ShadCN UI, the site offers a modern, responsive, and engaging user experience.

The portfolio covers sections on my work experience, education, technical skills, certifications, and personal projects, providing a complete picture of my professional journey.

## Technologies Used

- **Next.js**: React framework for building the user interface.
- **TypeScript**: Typed superset of JavaScript for improved code maintainability.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn UI**: UI components library.
- **Firebase**: Used for backend services like authentication and data storage.
- **Genkit (Google AI)**: Powers the AI translation capabilities.

## Setup and Running the Project

To set up and run the project locally, follow these steps:
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd <project-directory>
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add your Firebase and Google Generative AI credentials. You can get these from your Firebase project settings and Google AI Studio.
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key
   ```
5. **Run the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:9002`.
