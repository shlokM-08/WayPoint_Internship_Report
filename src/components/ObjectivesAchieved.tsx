import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ObjectivesAchieved.css';
import version14Image from '../public/assets/1.4.png';
import version15Image from '../public/assets/1.5.png';
import version16Image from '../public/assets/1.6.png';
import version17Image from '../public/assets/1.7.png';

const categories = [
  'UX/UI development',
  'Integration and Userflow',
  'Research/Intuitive solutions',
  'Versions Pushed'
];

const researchSolutions = [
  'Researched and found solution to dynamically fetch brand logos online without wasting any compute or storage for all company logos.',
  'In Brand.shopping page, started embedding images dynamically in the products to ensure a better UI and UX for users.',
  'Analytics page had no graphs initially; read the API responses and created relevant aggregated graphs keeping in mind user context and requirements.',
  'Added WhatsApp chatbot icon at the bottom of the page for help, allowing users to easily contact support.'
];

const uxUiDevelopment = {
  Brand: [
    'UI for tabs visibility, prompts, platforms, region, personas, sentiment, shopping and citations.',
    'Aggregated all raw data from BE to show on FE in a user friendly format.',
    'Shopping page ensured user has to only add product URL and all other information aggregated on info to provide him the product information and even let them add products through their Google Analytics most visible pages.'
  ],
  Analytics: [
    'Suggested and made changes to UI to make it different from the figma prototype for a better UX.',
    'Added modal to analytics tab for users to configure their analytics details and even now they can do it using Google OAuth.',
    'Added loading screens and null data screen for better UX and UI too.',
    'Altered figma prototype to match UI to be consistent with the rest of the dashboard.'
  ],
  'Technical Audit': [
    'End to end UI developed using inspiration from technical audit page of trackr.ai.',
    'Added loading screens, reoccurring buttons labels and error handling to ensure a good UX.',
    'Error handling cases handled where if a user has a tech audit already in the DB but its not showing he can run it again and if data hasn\'t changed we show him cached results for a quicker output.'
  ],
  'SignIn Page': [
    'Designed UI for this page and ensured all small inconsistencies fixed like what type of data we are showing to user, what all they should be able to access and things they don\'t need to touch all been hidden and also added good loading screens to ensure user understands data is loading because some of the backend APIs take some time to generate outputs.'
  ]
};

const integrationUserflow = [
  <><strong>Notifications:</strong> Made sure we refresh get notifications API every second so that any new notification user doesn't have to refresh their page but rather live the notification is read.</>,
  <><strong>Userflow:</strong> Added loading screens to all pages to ensure better UX and even modals for loading time to ensure user knows input is being loaded.</>,
  <><strong>Signin page:</strong> User now after his onboarding directly is taken to his dashboard instead of having to login.</>,
  <><strong>Dashboard:</strong> Username, logo and role displayed at the left bottom to ease user with knowing which account and what level of access they have.</>
];

const versionImages = [
  { version: '1.4', image: version14Image },
  { version: '1.5', image: version15Image },
  { version: '1.6', image: version16Image },
  { version: '1.7', image: version17Image }
];

const ObjectivesAchieved = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const toggleCategory = (category: string) => {
    if (category === 'UX/UI development' || category === 'Research/Intuitive solutions' || category === 'Integration and Userflow' || category === 'Versions Pushed') {
      setExpandedCategory(expandedCategory === category ? null : category);
    }
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : versionImages.length - 1);
    } else {
      setSelectedImageIndex(selectedImageIndex < versionImages.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

  useEffect(() => {
    if (selectedImageIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev => prev !== null && prev > 0 ? prev - 1 : versionImages.length - 1);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev => prev !== null && prev < versionImages.length - 1 ? prev + 1 : 0);
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex]);

  return (
    <div className="objectives-container">
      <h1 className="objectives-title">Summary of Objectives Achieved</h1>
      <div className="objectives-wrapper">
        {categories.map((category) => {
          const isExpanded = expandedCategory === category;
          const isUxUiCategory = category === 'UX/UI development';
          const isResearchCategory = category === 'Research/Intuitive solutions';
          const isIntegrationCategory = category === 'Integration and Userflow';
          const isVersionsCategory = category === 'Versions Pushed';
          const isExpandable = isUxUiCategory || isResearchCategory || isIntegrationCategory || isVersionsCategory;

          return (
            <div key={category} className="category-section">
              <button
                onClick={() => isExpandable && toggleCategory(category)}
                className={`category-toggle-btn ${isExpandable ? 'clickable' : ''}`}
                disabled={!isExpandable}
              >
                <span className="category-title">{category}</span>
                {isExpandable && (
                  <span className="category-toggle-icon">
                    {isExpanded ? '▼' : '▶'}
                  </span>
                )}
              </button>
              
              {isExpanded && isUxUiCategory && (
                <div className="category-objectives">
                  {Object.entries(uxUiDevelopment).map(([section, points]) => (
                    <div key={section} className="objective-entry">
                      <h3 className="objective-section-title">{section}</h3>
                      <ul className="objective-tasks">
                        {points.map((point, index) => (
                          <li key={index} className="objective-task">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {isExpanded && isResearchCategory && (
                <div className="category-objectives">
                  <div className="objective-entry">
                    <ul className="objective-tasks">
                      {researchSolutions.map((solution, index) => (
                        <li key={index} className="objective-task">
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {isExpanded && isIntegrationCategory && (
                <div className="category-objectives">
                  <div className="objective-entry">
                    <ul className="objective-tasks">
                      {integrationUserflow.map((item, index) => (
                        <li key={index} className="objective-task">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {isExpanded && isVersionsCategory && (
                <div className="category-objectives">
                  <div className="objective-entry versions-entry">
                    <div className="versions-grid">
                      {versionImages.map(({ version, image }, index) => (
                        <div key={version} className="version-item">
                          <img 
                            src={image} 
                            alt={`Version ${version}`}
                            className="version-image"
                            onClick={() => openImageModal(index)}
                          />
                          <p className="version-label">Version {version}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Image Modal - Rendered via Portal */}
      {selectedImageIndex !== null && createPortal(
        <div 
          className="image-modal-overlay" 
          onClick={closeImageModal}
        >
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={closeImageModal}>
              <span className="close-icon">×</span>
            </button>
            
            <button 
              className="image-modal-nav image-modal-nav-left" 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              aria-label="Previous image"
            >
              ‹
            </button>
            
            <button 
              className="image-modal-nav image-modal-nav-right" 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              aria-label="Next image"
            >
              ›
            </button>
            
            <img 
              src={versionImages[selectedImageIndex].image} 
              alt={`Version ${versionImages[selectedImageIndex].version}`}
              className="image-modal-image"
            />
            <p className="image-modal-label">
              Version {versionImages[selectedImageIndex].version} ({selectedImageIndex + 1} / {versionImages.length})
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ObjectivesAchieved;


