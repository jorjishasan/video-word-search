import React from 'react';
import { COLORS, shadow, text, flexCenter } from '../utils/styles'; // Import more styles

const NoTranscriptMessage = ({ errorMessage }) => {
  // Styles
  const containerStyle = {
    padding: '1rem', // p-4
    marginTop: '0.5rem', // mt-2
    backgroundColor: COLORS.gray[800], // bg-gray-800
    borderRadius: '0.375rem', // rounded-md
    boxShadow: shadow.lg, // Use shadow from styles.js
  };

  const contentStyle = {
    ...flexCenter, // Use flexCenter for display, alignItems
    flexDirection: 'column', 
    gap: '1rem', // gap-4
  };

  const emojiStyle = {
    color: COLORS.gray[400], // text-gray-400
    ...text['4xl'], // Use text size from styles.js
  };

  const headingStyle = {
    ...text.xl, // Use text size from styles.js
    textAlign: 'center',
    fontWeight: '500', // font-medium
    color: COLORS.white, // text-white
    margin: 0, // Reset default margin
  };

  const errorTextStyle = {
    textAlign: 'center',
    color: COLORS.red[500], // text-red-500
    marginBottom: '0.5rem', // mb-2
    ...text.sm, // Use text size from styles.js
  };

  const infoTextStyle = {
    textAlign: 'center',
    color: COLORS.gray[400], // text-gray-400
    margin: 0, // Reset default margin
  };

  const listStyle = {
    color: COLORS.gray[400], // text-gray-400
    paddingLeft: '1.5rem', // pl-6 (approx)
    listStyleType: 'disc', // list-disc
    width: '100%', // w-full
    maxWidth: '28rem', // max-w-md
    margin: 0, // Reset default margin
    ...text.sm, // Use text size from styles.js
  };

  const listItemStyle = {
    marginBottom: '0.25rem', // Add some spacing between list items
  };

  const footerTextStyle = {
    textAlign: 'center',
    color: COLORS.gray[400], // text-gray-400
    ...text.sm, // Use text size from styles.js
    marginTop: '0.5rem', // mt-2
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={emojiStyle}>😞</div>

        <h3 style={headingStyle}>
          No Transcript Available
        </h3>

        {/* Display the error message passed via props */}
        {errorMessage && (
          <p style={errorTextStyle}>
            {/* Displaying the raw error might be verbose, consider simplifying */}
            {typeof errorMessage === 'string' ? errorMessage : 'An error occurred.'}
          </p>
        )}

        <p style={infoTextStyle}>
          Unfortunately, we couldn't find a transcript for this video. Transcripts may not be available for several reasons:
        </p>

        <ul style={listStyle}>
          <li style={listItemStyle}>The video owner hasn't provided captions</li>
          <li style={listItemStyle}>The video may be too new</li>
          <li style={listItemStyle}>The video may be in a language we don't support yet</li>
          <li style={listItemStyle}>There might be an issue with YouTube's transcript service</li>
        </ul>

        <p style={footerTextStyle}>
          Try searching for another video that includes captions or subtitles.
        </p>
      </div>
    </div>
  );
};

export default NoTranscriptMessage;