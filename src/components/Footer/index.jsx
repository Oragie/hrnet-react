import logo from "../../assets/img/logoHRNet_nobg.webp";
import "./_footer.scss";

function Footer() {
  return (
    <footer className="hrnet-footer">
      <div className="footer-content">
        <img src={logo} alt="Wealth Health Logo" className="footer-logo" />
        <span className="footer-text">Wealth Health - HRNet 2023</span>
      </div>
    </footer>
  );
}

export default Footer;
