import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';
import './style.scss';

function AdditionalSection({ items }) {
    if(!items || items.length < 2) return null;
    return (
        <div className="additional-section">
            <SectionHeader title="Award & Patent"/>
            {items.map((item, index) =>
                index === 0 ? null : (
                    <div className="item" key={index}>
                        <div className="intro">
                            <div className="head">
                                <div className="head-main">
                                    {item.title}
                                    {item.links && (
                                        <IconButtonBar links={item.links} style={{ color: '#a8a8a8', fontSize: 16, padding: 0 }} />
                                    )}
                                </div>
                                <div className="head-detail">
                                    <div className="date">{item.date}</div>
                                    <div className="agency">{item.agency}</div>
                                </div>
                            </div>
                        </div>
                        <div className="body">
                            <div className="description">{item.description}</div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default AdditionalSection;