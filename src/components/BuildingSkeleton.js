import React from 'react'

const BuildingSkeleton = () => (
  <>
    <div className="d-flex justify-content-start flex-wrap">
      <h2 className="skeleton-box skeleton-square-box2">&nbsp;</h2>
      <div>
        <p className="skeleton-box skeleton-header-box"/>
        <p className="skeleton-box skeleton-line-box"/>
        <p className="skeleton-box skeleton-line-box"/>

        <p className="skeleton-box skeleton-line-box2"/>
        <p className="skeleton-box skeleton-line-box2"/>

        <p className="skeleton-box skeleton-line-box3"/>
        <p className="skeleton-box skeleton-line-box3"/>
      </div>
    </div>
    <div className="d-flex justify-content-start flex-wrap mt-4">
      <p className="skeleton-box skeleton-header-box"/>
      <p className="skeleton-box skeleton-header-box"/>
      <p className="skeleton-box skeleton-header-box"/>
      <p className="skeleton-box skeleton-header-box"/>
      <p className="skeleton-box skeleton-header-box"/>
    </div>
    <div className="d-flex justify-content-start flex-wrap mt-3">
      <p className="skeleton-box skeleton-line-box3"/>
      <p className="skeleton-box skeleton-line-box3"/>
      <p className="skeleton-box skeleton-line-box4"/>
      <p className="skeleton-box skeleton-line-box4"/>
      <p className="skeleton-box skeleton-line-box4"/>
      <p className="skeleton-box skeleton-line-box4"/>
      <p className="skeleton-box skeleton-line-box4"/>
    </div>
  </>
)

export default BuildingSkeleton