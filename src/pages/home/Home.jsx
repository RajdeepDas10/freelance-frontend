// src/pages/Home.js

import { useState } from "react";

function HomePage() {
  const [projectType, setProjectType] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");

  const handleProjectTypeChange = (event) => {
    setProjectType(event.target.value);
  };

  const handleFixedPriceChange = (event) => {
    setFixedPrice(event.target.value);
  };

  const clearFilters = () => {
    setProjectType("");
    setFixedPrice("");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-4 w-full">
      <div className="w-full flex justify-center my-6">
        <span className="font-bold text-4xl text-center w-full">
          Welcome to Freelance marketplace
        </span>
      </div>
      <div className="container mx-auto">
        {/* <h1 className="text-3xl font-bold mb-4">Browse</h1> */}
        {/* <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            className="border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for projects"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => console.log("Save clicked")}
          >
            Save
          </button>
        </div> */}
        {/* <div className="flex space-x-4 mb-4">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md">
            Freelancers
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            Projects
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md">
            Contests
          </button>
        </div> */}
        <div className="flex gap-5  flex-wrap w-full">
          {/* <div className="w-1/3 bg-gray-800 rounded-md p-4">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Project type</h3>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  className="border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="hourlyRate"
                  value="Hourly Rate"
                  checked={projectType === "Hourly Rate"}
                  onChange={handleProjectTypeChange}
                />
                <label htmlFor="hourlyRate" className="text-gray-400">
                  Hourly Rate
                </label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  className="border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="fixedPrice"
                  value="Fixed Price"
                  checked={projectType === "Fixed Price"}
                  onChange={handleProjectTypeChange}
                />
                <label htmlFor="fixedPrice" className="text-gray-400">
                  Fixed Price
                </label>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Fixed price</h3>
              <input
                type="number"
                className="border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="min"
                value={fixedPrice}
                onChange={handleFixedPriceChange}
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">
                Trading Platform Market Data Socket
              </h3>
              <div className="flex items-center space-x-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2a1 1 0 002 0v-2zm-1 9a1 1 0 10-2 0v2a1 1 0 002 0v-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-400">Node.js, Socket IO</span>
              </div>
            </div>
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div> */}

          {[1, 2, 3, 4, 5].map((d) => (
            <div className="w-[30%] bg-gray-800 rounded-md p-4">
              {/* <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Top results</h2>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">1-20 of 1K results</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-.707L16 11.586V8a6 6 0 00-6-6zM10 18a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={() => console.log("View New Projects clicked")}
                >
                  View New Projects
                </button>
              </div>
            </div> */}
              <div className="bg-gray-700 rounded-md p-4 mb-4">
                <h3 className="text-lg font-bold mb-2">
                  Looking for Modern Frontend Designer and developer to redesign
                  our Portal
                </h3>
                <div className="mb-2">
                  <span className="text-gray-400">
                    Budget ₹1,500 - 12,500 INR
                  </span>
                </div>
                <p className="text-gray-400 mb-4">
                  I'm looking for a skilled frontend website designer to create
                  a comprehensive mockup and wireframes in Figma, convert them
                  to HTML and design a complete website template using frontend
                  frameworks like Bootstrap, Tailwind, React Js and Next Js. Key
                  Responsibilities: - Design a modern, minimalist portal with a
                  user-friendly interface - Design key pages...
                  {/* <a
                    href="#"
                    className="text-blue-500 hover:underline"
                    onClick={() => console.log("more clicked")}
                  >
                    more
                  </a> */}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">10 bids</span>
                  <span className="text-gray-400">
                    ₹10,900 INR
                    <span className="text-xs">average bid</span>
                  </span>
                </div>
                <div className="text-gray-400">
                  <span>Website Design</span>
                  <span>•</span>
                  <span>HTML</span>
                  <span>•</span>
                  <span>Bootstrap</span>
                  <span>•</span>
                  <span>Figma</span>
                  <span>•</span>
                  <span>TailWind</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

// import React, { useState } from "react";

// function HomePage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [projects, setProjects] = useState([
//     {
//       title:
//         "Looking for Modern Frontend Designer and developer to redesign our Portal",
//       budget: "₹1,500 - 12,500 INR",
//       description:
//         "I'm looking for a skilled frontend website designer to create a comprehensive mockup and wireframes in Figma, convert them to HTML and design a complete website template using frontend frameworks like Bootstrap, Tailwind, React Js and Next Js. Key Responsibilities: - Design a modern, minimalist portal with a user-friendly interface - Design key pages...",
//       bids: "10 bids",
//       averageBid: "₹10,900 INR",
//       skills: ["Website Design", "HTML", "Bootstrap", "Figma", "TailWind"],
//     },
//     // Add more projects here
//   ]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredProjects = projects.filter((project) =>
//     project.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="container mx-auto py-8">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Browse</h1>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Save
//           </button>
//         </div>
//         <div className="mt-4">
//           <input
//             type="text"
//             placeholder="Search for projects"
//             className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//         </div>
//         <div className="mt-8 flex space-x-4">
//           <div className="bg-white p-6 rounded-md shadow-md w-1/4">
//             <h2 className="text-lg font-bold mb-4">Filters</h2>
//             <div className="mb-4">
//               <h3 className="text-base font-bold mb-2">Project type</h3>
//               <div className="flex items-center space-x-2">
//                 <input type="checkbox" className="form-checkbox" />
//                 <label htmlFor="" className="text-gray-700">
//                   Hourly Rate
//                 </label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <input type="checkbox" className="form-checkbox" />
//                 <label htmlFor="" className="text-gray-700">
//                   Fixed Price
//                 </label>
//               </div>
//             </div>
//             <div className="mb-4">
//               <h3 className="text-base font-bold mb-2">Fixed price</h3>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="number"
//                   className="border rounded-md px-4 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="text-gray-700">min</span>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-md shadow-md w-3/4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-bold">Top results</h2>
//               <div className="flex items-center space-x-2">
//                 <span className="text-gray-700">1-20 of 1K results</span>
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                   Receive alert
//                 </button>
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                   View new projects
//                 </button>
//               </div>
//             </div>
//             <div className="mb-4">
//               <h3 className="text-base font-bold mb-2">Sort by</h3>
//               <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="latest">Latest</option>
//                 <option value="oldest">Oldest</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//               </select>
//             </div>
//             {filteredProjects.map((project) => (
//               <div
//                 key={project.title}
//                 className="border-b border-gray-300 py-4"
//               >
//                 <h3 className="text-xl font-bold mb-2">{project.title}</h3>
//                 <p className="text-gray-700 mb-2">Budget: {project.budget}</p>
//                 <p className="text-gray-700 mb-2">{project.description}</p>
//                 <div className="flex justify-between items-center">
//                   <p className="text-gray-700">{project.bids}</p>
//                   <p className="text-gray-700">{project.averageBid}</p>
//                 </div>
//                 <div className="mt-2">
//                   <ul className="flex space-x-2">
//                     {project.skills.map((skill) => (
//                       <li
//                         key={skill}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
//                       >
//                         {skill}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

// import React from "react";

// const HomePage = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-4xl font-bold mb-4">
//         Welcome to Freelance Marketplace
//       </h1>
//       <p className="text-lg">
//         Find the best freelancers or get hired for your next project!
//       </p>
//     </div>
//   );
// };

// export default HomePage;
