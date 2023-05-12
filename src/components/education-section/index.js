import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';
import './style.scss';

function EducationSection({ educations }) {
    if(!educations || educations.length < 2) return null;
    return (
        <div className="education-section">
            <SectionHeader title="Education" />
            {educations.map((education, index) =>
                index === 0 ? null : (
                    <div className="education">
                        <div className="head">
                            <div className="name">{education.name}</div>
                            <div className="date">{education.date}</div>
                        </div>
                        <div className="body">
                            <div className="degree">{education.degree}</div>
                            <div className="credit">{education.credit}</div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default EducationSection;