import React from 'react';

const NoTranscriptMessage = ({ errorMessage }) => {
  return (
    <div className="p-4 mt-2 bg-gray-800 rounded-md shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="text-gray-400 text-4xl">😞</div>
        
        <h3 className="text-xl text-center font-medium text-white">
          No Transcript Available
        </h3>
        
        {errorMessage && (
          <p className="text-center text-red-500 mb-2">
            Error: {errorMessage}
          </p>
        )}
        
        <p className="text-center text-gray-400">
          Unfortunately, we couldn't find a transcript for this video. Transcripts may not be available for several reasons:
        </p>
        
        <ul className="text-gray-400 pl-6 list-disc w-full max-w-md">
          <li>The video owner hasn't provided captions</li>
          <li>The video may be too new</li>
          <li>The video may be in a language we don't support yet</li>
          <li>There might be an issue with YouTube's transcript service</li>
        </ul>
        
        <p className="text-center text-gray-400 text-sm mt-2">
          Try searching for another video that includes captions or subtitles.
        </p>
      </div>
    </div>
  );
};

export default NoTranscriptMessage; 