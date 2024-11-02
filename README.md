# Project Overview
This project is a front-end application built with React, TypeScript and Vite. It allows users to view document types as draggable cards, interact with them and view images in an overlay. Data is initially loaded from a static JSON file and state is managed using React Hooks.

# Components and Implementation

# Card Component
The Card component represents individual document cards. It utilizes props to handle drag-and-drop functionality and display an overlay when the card image is clicked.


# DraggableCard Component
The DraggableCard component manages the overall state of the cards, handles drag-and-drop events and implements auto-saving functionality.


# Overlay Component
The Overlay component handles the display of the full-size image when a card is clicked.


# Spinner Component
The Spinner component provides a loading indicator while images are being fetched.

# Technology Stack
React: For building user interfaces with component-based architecture.
TypeScript: To add type safety and improve code maintainability.
Vite: For a fast development environment with hot module replacement.


# Thought Process
During the implementation, I focused on:

Component Design: Leveraged functional components and hooks to manage state and side effects.

Drag-and-Drop: Implemented drag-and-drop functionality for a seamless user experience when rearranging cards.

State Persistence: Used localStorage to persist card state across sessions, ensuring data permanence.

Auto-Saving: Set up an interval for auto-saving card data to the backend every five seconds, reducing the risk of data loss.

User Interaction: Enhanced user experience with overlays and loading indicators to provide feedback during interactions.

# Running the Application
Clone the repository.
Navigate to the project directory.
Install dependencies with npm install.
Start the application using npm run dev.


Conclusion
This README documents the implementation of the front-end portion of the test, focusing on the components and functionalities developed. Parts 4 and 5 were not addressed, as they fall outside my role as a front-end developer. For backend or deployment strategies, I recommend collaborating with a backend developer. Thank you for the opportunity to work on this project!