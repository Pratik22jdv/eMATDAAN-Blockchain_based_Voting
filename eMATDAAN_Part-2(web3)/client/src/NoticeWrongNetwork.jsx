function NoticeWrongNetwork() {
  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <p style={{ fontSize: "30px" }}>
          ⚠️ MetaMask is not connected to the same network as the one you deployed to.
        </p>
      </div>
    </div>
  );
}

export default NoticeWrongNetwork;
