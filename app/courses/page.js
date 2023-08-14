'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import {motion} from 'framer-motion'

const Course = () => {
  const [course, setCourse] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');

  // Define options for the graph
  const graphOptions = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: '#FFFFFF', // Edge color
      width: 2, // Edge width
      
    },
    nodes: {
      shape: 'box', // Node shape (can be 'circle', 'box', 'ellipse', etc.)
      size: 20, // Node size
      color: {
        border: '#000000', // Node border color
        background: '#84A9FF', // Node background color
        highlight: {
          border: '#000000', // Node border color when selected
          background: '#84A9FF', // Node background color when selected
        },
      },
      font: {
        size: 14, // Node label font size
        color: '#000000', // Node label font color
      },
      //style hover
      borderWidth: 1,
      borderWidthSelected: 2,

    },
    height: '400px',
    interaction: {
        dragNodes: false, // Disable dragging of nodes
        dragView: false, // Disable dragging of the graph
        zoomView: true, // Disable zooming of the graph
        selectable: true, // Disable selection of nodes
        hover: true, // Enable hover styling
        zoomSpeed: 0.1, // Zoom speed
      },

  };
  // Convert the course and its prerequisites into graph nodes and edges
  const graphData = {
    nodes: [],
    edges: [],
  };

  if (course) {
    let Level = -1;


    // Check if prerequisites are provided as a comma-separated string
    if (course.Prerequisites && typeof course.Prerequisites === 'string') {
      const prerequisitesArray = course.Prerequisites.split(',').map((prereq) => prereq.trim());
      prerequisitesArray.forEach((prereq, index) => {
        if (index % 7 === 0) Level += 1;
        graphData.nodes.push({ id: prereq, label: prereq, level: Level });
        graphData.edges.push({ from: prereq, to: course.Name });
      });
    }
    Level += 1;
    // Add the current course as a node
    graphData.nodes.push({ id: course.Name, label: course.Name, level: Level, color: '#ec31f3' });

    if (course.ReversePrerequisites && typeof course.ReversePrerequisites === 'string') {
      const reversePrerequisitesArray = course.ReversePrerequisites.split(',').map((prereq) => prereq.trim());
      reversePrerequisitesArray.forEach((prereq, index) => {
        if (index % 7 === 0) Level += 1;
        graphData.nodes.push({ id: prereq, label: prereq, level: Level });
        graphData.edges.push({ from: course.Name, to: prereq });
      });
    }
  }
  const handleNodeClick = (event) => {
    const { nodes, edges } = event;
    const targetcoursename = nodes[0];
    if (targetcoursename){
      window.location.href = `/courses?name=${targetcoursename}`;
    }
    

    };

  // Fetch the course data from the api
  useEffect(() => {
    async function fetchCourse() {
        if (id){
            const res = await fetch(`/api/courses/${id}`);
            const course = await res.json();
            setCourse(course);
        }
        else if (name){
            //encode the name
            const name1 = encodeURIComponent(name);
            const res = await fetch(`/api/courses/name/${name1}`);
            const course = await res.json();
            setCourse(course);
        }
       
      
    }
    fetchCourse();
  }, [id, name]);

  return (
    <div className='wrapper'>
      <div className='course-container'>
        <motion.div className='course-header'
          initial={{ opacity: 0 , x: -100}}
          animate={{ opacity: 1, x: 0}}
          transition={{ delay: 0.5 , duration: 0.5}}
        >
          <h1>{course?.Name}</h1>
          <div className='point-line'>
                <div className='point'></div>
                <div className='line'></div>
                <h3>Course Information</h3>
                <div className='line2'></div>
                <div className='point'></div>
            </div>
            <p>{course?.Description}</p>
            <p>{!course && "Not found" }</p>
        </motion.div>
        {/* Render the graph */}
        {course && (
            <motion.div className='graph-container'
              initial={{ opacity: 0 , x: 100}}
              animate={{ opacity: 1, x: 0}}
              transition={{ delay: 0.5 , duration: 0.5}}
            >
                <Graph graph={graphData} options={graphOptions} events={{click: handleNodeClick}} />
            </motion.div>
            )}
      </div>
      
    </div>
  );
};

export default Course;
