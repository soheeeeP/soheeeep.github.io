import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';
import './style.scss';


function OpenSourceSection({ opensources }) {
    if (!opensources || opensources.length < 2) return null;
    return (
        <div className="opensource-section">
            <SectionHeader title="Open Source"/>
            <div className="body">
                {opensources.map((opensource, index) => (
                    index === 0 ? null : (
                        <div className="opensource" key={index}>
                            <div className="intro">
                                <div className="name">{opensource.name}</div>
                                <div className="number">{opensource.number}</div>
                                <div className="detail">
                                {opensource.links && <IconButtonBar links={opensource.links} />}
                                </div>
                            </div>
                            
                            <div className="description">{opensource.description}</div>

                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default OpenSourceSection;