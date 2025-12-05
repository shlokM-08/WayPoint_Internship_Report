import { useState } from 'react';
import './HoursTable.css';
import { hoursData } from '../data/hoursData';

// Format date from DD/MM to DD/MM/2025
const formatDate = (date: string): string => {
  return `${date}/2025`;
};

const HoursTable = () => {
  const [visibleRows, setVisibleRows] = useState(10);
  const itemsPerPage = 10;

  const displayedData = hoursData.slice(0, visibleRows);
  const hasMore = visibleRows < hoursData.length;

  const handleLoadMore = () => {
    setVisibleRows((prev) => Math.min(prev + itemsPerPage, hoursData.length));
  };

  return (
    <div className="hours-table-container">
      <h1 className="table-title">Work Hours Report</h1>
      <div className="table-wrapper">
        <table className="hours-table">
          <thead>
            <tr>
              <th>Date (DD/MM/YYYY)</th>
              <th>Hours Worked</th>
              <th>Expected Hours (8AM–5PM)</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((row, index) => (
              <tr key={index}>
                <td>{formatDate(row.date)}</td>
                <td>{row.hoursWorked.toFixed(2)}</td>
                <td>{row.expectedHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasMore && (
          <div className="load-more-container">
            <button onClick={handleLoadMore} className="load-more-btn">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoursTable;

