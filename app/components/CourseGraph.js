import React, { useEffect, useState } from 'react';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';
import Papa from 'papaparse';
import csvFile from './course_prereqs.csv';

const CourseGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: new DataSet(), edges: new DataSet() });

  useEffect(() => {

    // Function to parse the CSV data and create graphData object
    const parseCSVData = (csvData) => {
      const nodes = new DataSet();
      const edges = new DataSet();
  

      // Process each row of the CSV data
      csvData.forEach((row) => {
        const course = row['Course']; // Replace 'course' with the column name representing the course
        const prerequisites = row['Prereqs']; // Replace 'prerequisites' with the column name representing the prerequisites
      
        

        // Add nodes for courses
        nodes.add({ id: course, label: course });

        // Parse prerequisites and add edges
        if (prerequisites) {
          const prerequisiteList = prerequisites.split(','); // Assuming prerequisites are comma-separated in the CSV
          prerequisiteList.forEach((prerequisite) => {
            edges.add({ from: prerequisite.trim(), to: course });
          });
        }
      });
      console.log(nodes);
      console.log(edges);

      return { nodes, edges };
    };

    // Fetch and parse the CSV data
    Papa.parse(csvFile, {
        download: true,
        header: true,
      complete: (results) => {
        const graphData = parseCSVData(results.data);
        setGraphData(graphData);
      },
    });

    // Clean up
    return () => {
      graphData.nodes.clear();
      graphData.edges.clear();
    };
  }, []);

  useEffect(() => {
    // Create and configure the graph visualization
    const container = document.getElementById('graph-container');
    const data = { nodes: graphData.nodes, edges: graphData.edges };
    const options = {
        edges: {
          arrows: {
            to: { enabled: true, scaleFactor: 1, type: 'arrow' },
          },
          color: {
            color: '#848484', // Customize the edge color as needed
            highlight: '#2B7CE9', // Customize the edge highlight color as needed
          },
          smooth: {
            enabled: true,
            type: 'continuous', // You can try different smoothing types if needed
          },
        },
        physics: {
          enabled: false,
        },
      };
    const network = new Network(container, data, options);

    // Clean up
    return () => {
      network.destroy();
    };
  }, [graphData]);

  return <div id="graph-container" style={{ height: '500px' }}></div>;
};

export default CourseGraph;
