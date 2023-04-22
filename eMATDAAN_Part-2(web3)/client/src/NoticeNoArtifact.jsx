function NoticeNoArtifact() {
  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <p style={{fontSize: "30px"}}>
          ⚠️ Cannot find <span className="code">Election</span> contract artifact.
          Please complete the above preparation first, then restart the react dev server.
        </p>
      </div>
    </div>
  );
}

export default NoticeNoArtifact;
