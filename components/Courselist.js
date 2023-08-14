import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Link from 'next/link'
import { set } from 'mongoose';

const Courselist = () => {
  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [coursesPerPage, setCoursesPerPage] = useState(12);
  const [search, setSearch] = useState("");
  const [found, setFound] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch('/api/courses');
      const courses2 = await res.json();
      setCourses(courses2);
      setFilteredCourses(courses2);
    }
    fetchCourses();
  }, []);

  // Update the displayed courses whenever the courses state or currentPage changes
  useEffect(() => {
    setDisplayedCourses(filteredCourses.slice(0, coursesPerPage));
  }, [courses, coursesPerPage, filteredCourses]);

  // Function to handle the "Load More" button click
  const handleLoadMore = () => {
    setCoursesPerPage(coursesPerPage + 12);
  };

  // Function to handle the search bar
  const handleSearch = (e) => {
    setSearch(e.target.value);
    // Filter the courses based on the search query
    setFilteredCourses(courses.filter((course) => course.Name.toLowerCase().includes(e.target.value.toLowerCase())));
    // Update the displayed courses, if empty, say no results
    console.log(filteredCourses);
    if (filteredCourses.length > 0) {
      setFound(true);
      setDisplayedCourses(filteredCourses.slice(0, coursesPerPage));
    }
    else {
      setDisplayedCourses([]);
      setFound(false);
    }
  };

  return (
    <div className='wrapper'>
       <motion.input
                initial={{ opacity: 0 , x: -100}}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="search-bar"
                type="text"
                placeholder="Search for a course"
                onChange={handleSearch}
                value={search}
            />

      <div className='course-list-container'>
        <div className='course-list'>
          {displayedCourses.map((course, index) => (
            // give each course a unique key
            <Tilt
              key={course._id}
              options={{
                max: 15,
                scale: 1.05,
                speed: 400,
                transition: true,
                reset: true,
              }}
            >
            <Link href={`/courses?id=${course._id}`}>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index%12) * 0.1, duration: 0.2 }}
                className='course'
              >
                <h3>{course.Name}</h3>
                <p>
                  {course.Prerequisites
                    ? `Prerequisites: ${course.Prerequisites.split(',').slice(0, 1).join(', ')} ...`
                    : 'No prerequisites'}
                </p>
              </motion.div>
              </Link>
            </Tilt>
          ))}
          
        </div>
        {/* "Load More" button */}
        {/* Only show the button if there are more courses to load */}
        {(coursesPerPage < filteredCourses.length && found) && (
            <motion.button
                initial={{ opacity: 0 , x: -100}}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="load-more"
                onClick={handleLoadMore}
            >
                Load More
            </motion.button>
        )}
      </div>
    </div>
  );
};

export default Courselist;
