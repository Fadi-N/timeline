import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {Snippet} from "@nextui-org/react";
import {Image} from "@nextui-org/react";

import home from '../../../public/img/home.png';
import login from '../../../public/img/login.png';
import registration from '../../../public/img/registration.png';
import folders from '../../../public/img/folders.png';
import notes from '../../../public/img/notes.png';
import profile from '../../../public/img/profile.png';
const Documentation = ({auth}) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Documentation"/>

            <div className="flex h-[calc(100vh-65px)] bg-gray-100">
                {/* Sidebar Navigation */}
                <aside className="w-1/4 bg-white shadow-lg p-6 hidden md:inline-block">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Documentation</h2>
                    <nav className="space-y-2">
                        <a href="#introduction" className="block text-gray-600 hover:text-yellow-custom">1. Introduction</a>
                        <a href="#architecture" className="block text-gray-600 hover:text-yellow-custom">2. Application Architecture</a>
                        <a href="#features" className="block text-gray-600 hover:text-yellow-custom">3. Features Overview</a>
                        <a href="#installation" className="block text-gray-600 hover:text-yellow-custom">4. Installation</a>
                        <a href="#configuration" className="block text-gray-600 hover:text-yellow-custom">5. Configuration</a>
                        <a href="#usage" className="block text-gray-600 hover:text-yellow-custom">6. Usage Guide</a>
                        <a href="#key-components" className="block text-gray-600 hover:text-yellow-custom">7. Key Components</a>
                        <a href="#api" className="block text-gray-600 hover:text-yellow-custom">8. API Endpoints</a>
                        <a href="#security" className="block text-gray-600 hover:text-yellow-custom">9. Security</a>
                        <a href="#authentication" className="block text-gray-600 hover:text-yellow-custom">10. Authentication Mechanisms</a>
                        <a href="#deployment" className="block text-gray-600 hover:text-yellow-custom">11. Deployment</a>
                        <a href="#troubleshooting" className="block text-gray-600 hover:text-yellow-custom">12. Troubleshooting</a>
                        <a href="#screenshots" className="block text-gray-600 hover:text-yellow-custom">13. Screenshots</a>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="documentation-container w-full md:w-3/4 p-8 overflow-y-scroll h-[calc(100vh-65px)]">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Note Management Application Documentation</h1>

                    {/* Section 1: Introduction */}
                    <section id="introduction" className="mb-8">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">1</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Introduction</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <p className="text-gray-700">This <strong>Note Management Application</strong> is designed to streamline personal and professional organization. Users can create notes, group them into folders, assign statuses, and set deadlines, making it easy to track tasks, thoughts, and goals with a structured, intuitive UI.</p>
                        </div>
                    </section>

                    {/* Section 2: Application Architecture */}
                    <section id="architecture" className="mb-8">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">2</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Application Architecture</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <p className="text-gray-700 mb-4">This application follows a <strong>monolithic architecture</strong>, combining frontend and backend within the Laravel framework. It is <strong>component-driven</strong>, with custom hooks for data management and Inertia.js for linking React components with Laravel.</p>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <pre className="bg-white p-4 rounded-lg mt-4 overflow-auto text-sm">
                                <code>
{`timeline/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   ├── Controller.php
│   │   │   ├── DocumentationController.php
│   │   │   ├── FolderController.php
│   │   │   ├── NoteController.php
│   │   │   └── ProfileController.php
│   ├── Models/
│   │   ├── Folder.php
│   │   ├── Note.php
│   │   └── User.php
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── Forms/
│   │   │   └── Wrappers/
│   │   ├── Hooks/
│   │   ├── Layouts/
│   │   └── Pages/
│   │   ├── Auth/
│   │   ├── Profile/
│   │   ├── Dashboard.jsx
│   │   ├── Documentation.jsx
│   │   └── Notes.jsx
├── routes/
│   ├── api.php
│   ├── auth.php
│   ├── channels.php
│   ├── console.php
│   └── web.php`}
                                </code>
                            </pre>
                        </div>
                    </section>

                    {/* Section 3: Features Overview */}
                    <section id="features" className="mb-8">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">3</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Features Overview</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li><strong>User Authentication</strong>: Secure login, registration, and logout.</li>
                                <li><strong>Note Management</strong>: Create, edit, and delete notes with content fields.</li>
                                <li><strong>Folder Organization</strong>: Group notes within folders for easy categorization.</li>
                                <li><strong>Status Assignment</strong>: Assign statuses to notes to track progress.</li>
                                <li><strong>Deadline Tracking</strong>: Add start and end dates for task reminders.</li>
                                <li><strong>Advanced Filtering</strong>: Filter notes by status.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4: Installation */}
                    <section id="installation" className="mb-8">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">4</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Installation</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <p className="text-gray-700">Follow these steps to set up the application locally:</p>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <ol className="list-decimal list-inside text-gray-700 mt-4 space-y-2">
                                <li><span className="mr-2">Clone the repository:</span><Snippet size="sm">git clone https://github.com/Fadi-N/timeline.git</Snippet></li>
                                <li><span className="mr-2">Install backend dependencies:</span><Snippet size="sm">composer install</Snippet></li>
                                <li><span className="mr-2">Install frontend dependencies:</span><Snippet size="sm">npm install</Snippet></li>
                                <li><span className="mr-2">Environment setup:</span>Copy <Snippet size="sm">.env.example</Snippet> to <Snippet size="sm">.env</Snippet> and configure settings.</li>
                                <li><span className="mr-2">Database setup:</span>Run migrations with <Snippet size="sm">php artisan migrate</Snippet></li>
                                <li><span className="mr-2">Build the application:</span>Compile assets with <Snippet size="sm">npm run dev</Snippet> and start the server with <Snippet size="sm">php artisan serve</Snippet></li>
                            </ol>
                        </div>
                    </section>

                    {/* Section 5: Configuration */}
                    <section id="configuration" className="mb-8">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">5</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Configuration</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <Table aria-label="Configuration Table" className="w-auto">
                                <TableHeader>
                                    <TableColumn>Variable</TableColumn>
                                    <TableColumn>Description</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    <TableRow key="1"><TableCell>DB_DATABASE</TableCell><TableCell>Name of the database</TableCell></TableRow>
                                    <TableRow key="2"><TableCell>DB_USERNAME</TableCell><TableCell>Database user</TableCell></TableRow>
                                    <TableRow key="3"><TableCell>DB_PASSWORD</TableCell><TableCell>Password for database user</TableCell></TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </section>

                    {/* Section 6: Usage Guide */}
                    <section id="usage" className="mb-8">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">6</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Usage Guide</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                                <li><strong>Homepage</strong>: Introduction to the application with login/register options.</li>
                                <li><strong>Dashboard</strong>: Displays all folders created by the user.</li>
                                <li><strong>Folder View</strong>: Shows notes within a selected folder with status filtering.</li>
                                <li><strong>Note Management</strong>: Allows creation, editing, and deletion of notes.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 7: Key Components */}
                    <section id="key-components" className="mb-10">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">7</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Key Components</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <div>
                                <p className="text-gray-700 mb-4">This application consists of several key components:</p>
                                <ul className="list-disc ml-8 text-gray-700">
                                    <li><strong>Controllers</strong>: Manage HTTP requests and contain business logic.</li>
                                    <li><strong>Models</strong>: Represent database entities and handle interactions.</li>
                                    <li><strong>Resources</strong>: Frontend React components, hooks, and layouts.</li>
                                    <li><strong>Routes</strong>: Define URL mappings to controllers and endpoints.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 8: API Endpoints */}
                    <section id="api" className="mb-10">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">8</span>
                            </div>
                            <h2 className="text-2xl font-semibold">API Endpoints</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <div>
                                <p className="text-gray-700 mb-4">Below is a list of the main API endpoints:</p>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Authentication</h3>
                                <ul className="list-disc ml-8 text-gray-700 space-y-2">
                                    <li><strong>POST /login</strong>: Logs in a user and returns an authentication token.</li>
                                    <li><strong>POST /register</strong>: Registers a new user and returns an authentication token.</li>
                                    <li><strong>POST /logout</strong>: Logs out the authenticated user.</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Folders</h3>
                                <ul className="list-disc ml-8 text-gray-700 space-y-2">
                                    <li><strong>GET /folders</strong>: Retrieves a list of folders.</li>
                                    <li><strong>POST /folders</strong>: Creates a new folder.</li>
                                    <li><strong>PUT /folders/{'{id}'}</strong>: Updates a folder by ID.</li>
                                    <li><strong>DELETE /folders/{'{id}'}</strong>: Deletes a folder by ID.</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Notes</h3>
                                <ul className="list-disc ml-8 text-gray-700 space-y-2">
                                    <li><strong>GET /folders/{'{folder_id}'}/notes</strong>: Retrieves notes in a folder.</li>
                                    <li><strong>POST /folders/{'{folder_id}'}/notes</strong>: Creates a new note.</li>
                                    <li><strong>PUT /notes/{'{id}'}</strong>: Updates a note by ID.</li>
                                    <li><strong>DELETE /notes/{'{id}'}</strong>: Deletes a note by ID.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 9: Security */}
                    <section id="security" className="mb-8">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">9</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Security</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <p className="text-gray-700">This application employs several security measures to protect user data and application integrity:</p>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                                <li><strong>Database Security</strong>: Implements secure access controls, protecting data against unauthorized access. SQL Injection protection is enforced by using parameterized queries.</li>
                                <li><strong>Encryption</strong>: Sensitive data such as user passwords are encrypted using secure hashing algorithms to prevent exposure in the event of a data breach.</li>
                                <li><strong>Input Validation</strong>: Validates and sanitizes all user inputs to prevent common security vulnerabilities like XSS and SQL Injection attacks.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 10: Authentication Mechanisms */}
                    <section id="authentication" className="mb-8">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">10</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Authentication Mechanisms</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <p className="text-gray-700">The application uses secure authentication mechanisms to ensure only authorized users can access their data:</p>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                                <li><strong>JWT Authentication</strong>: Users are authenticated via JSON Web Tokens (JWT), ensuring secure and stateless sessions.</li>
                                <li><strong>Password Hashing</strong>: Passwords are hashed using a robust hashing algorithm, such as bcrypt, to safeguard user credentials.</li>
                                <li><strong>Session Timeout</strong>: Sessions automatically expire after a period of inactivity, adding another layer of protection against unauthorized access.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 11: Deployment */}
                    <section id="deployment" className="mb-8">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">11</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Deployment</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <p className="text-gray-700">The application can be deployed on various web servers. Here is a brief overview of the steps to deploy this application:</p>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <ol className="list-decimal list-inside text-gray-700 mt-4 space-y-2">
                                <li><strong>Setup the Server</strong>: Configure a web server environment (e.g., Apache, Nginx) with PHP and a MySQL database.</li>
                                <li><strong>Clone the Repository</strong>: Use <Snippet size="sm">git clone</Snippet> to copy the application’s repository to the server.</li>
                                <li><strong>Install Dependencies</strong>: Run <Snippet size="sm">composer install</Snippet> and <Snippet size="sm">npm install</Snippet> to install backend and frontend dependencies.</li>
                                <li><strong>Environment Configuration</strong>: Set up the <Snippet size="sm">.env</Snippet> file with production database and server credentials.</li>
                                <li><strong>Run Migrations</strong>: Apply database migrations by running <Snippet size="sm">php artisan migrate</Snippet>.</li>
                                <li><strong>Start the Server</strong>: Configure the web server to serve the application, and ensure assets are compiled with <Snippet size="sm">npm run production</Snippet>.</li>
                            </ol>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <p className="text-gray-700 mt-4">The application is live at: <a href="http://timeline-fn.cba.pl/" className="text-blue-500 underline">http://timeline-fn.cba.pl/</a></p>
                        </div>
                    </section>

                    {/* Section 12: Troubleshooting */}
                    <section id="troubleshooting" className="mb-10">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">12</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Troubleshooting</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <ul className=" list-none ml-0 text-gray-700 space-y-4">
                                <li className="bg-white shadow-lg p-4 rounded-2xl">
                                    <strong>Issue:</strong> Database connection error
                                    <br/>
                                    <strong>Solution:</strong> Ensure that the database credentials in the <Snippet size="sm">.env</Snippet> file are correct, and that the database server is running. Check values for <Snippet size="sm">DB_DATABASE</Snippet>, <Snippet size="sm">DB_USERNAME</Snippet>, and <Snippet size="sm">DB_PASSWORD</Snippet>.
                                </li>
                                <li className="bg-white shadow-lg p-4 rounded-2xl">
                                    <strong>Issue:</strong> CSS or JavaScript not loading correctly
                                    <br/>
                                    <strong>Solution:</strong> Run <Snippet size="sm">npm run dev</Snippet> to compile assets. If in production, run <Snippet size="sm">npm run production</Snippet> for minified assets.
                                </li>
                                <li className="bg-white shadow-lg p-4 rounded-2xl">
                                    <strong>Issue:</strong> "Class not found" error
                                    <br/>
                                    <strong>Solution:</strong> Ensure all dependencies are installed by running <Snippet size="sm">composer install</Snippet> and <Snippet size="sm">npm install</Snippet>. If the issue persists, run <Snippet size="sm">composer dump-autoload</Snippet>.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 13: Screenshots */}
                    <section id="screenshots" className="mb-10">
                        <div className="flex items-center space-x-6 mb-2">
                            <div className="w-[32px] h-[32px] bg-yellow-custom rounded-full text-center flex items-center justify-center">
                                <span className="font-semibold">13</span>
                            </div>
                            <h2 className="text-2xl font-semibold">Screenshots</h2>
                        </div>
                        <div className="flex">
                            <div className="border-s-3 border-yellow-custom ms-4 me-9"></div>
                            <div className="flex flex-col space-y-4 w-full">
                                <Image alt="Homepage" src={home} />
                                <Image alt="Login Page" src={login} />
                                <Image alt="Registration Page" src={registration} />
                                <Image alt="Folders View" src={folders} />
                                <Image alt="Notes View" src={notes} />
                                <Image alt="Profile Page" src={profile} />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </AuthenticatedLayout>
    );
};

export default Documentation;
