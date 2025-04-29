import React from 'react';
import UseCasesClient from './UseCasesClient';

const UseCases = () => {
  return (
    <section id="use-cases" className="w-full py-20 md:py-28 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <UseCasesClient />
      </div>
    </section>
  );
};

export default UseCases;
