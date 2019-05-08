import React from "react";
import {connect} from "react-redux";
import "~/assets/css/pages/index.less";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

@i18n("Index")
class Index extends React.Component {
  static async getInitialProps({ $axios }) {
    try {
      const bookRes = await $axios.get("/api/books/all");

      return {
        books: bookRes.data.result
      };
    } catch (error) {

      return {};
    }
  }

  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      books: props.books || [],
      show: false,
    };
  }

  componentDidMount() {
  }

  handleSelect(key) {
    this.$store.actions.lang.setLang(key);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  async refreshBook() {
    try {
      const bookRes = await this.$axios.get("/api/books/all");

      this.setState({books: bookRes.data.result});
    } catch (error) {
    }
  }

  async addNewBook() {
    try {
      await this.$axios.post(`/api/books/add?name=${this.refs.inputName.value}&author=${this.refs.inputAuthor.value}`);
      this.refreshBook();
      this.handleClose();
    } catch (error) {
    }
  }

  render() {
    let langText = "";
    const navComArr = this.props.locales.map((item, index) => {
      if(item.val === this.props.$lang) {
        langText = item.text;
      }
      return <NavDropdown.Item key={index} eventKey={item.val}>{item.text}</NavDropdown.Item>
    });

    return <div className="page-index">
      <Nav activeKey="/" className="nav">
        <Nav.Item>
          <Nav.Link href="/">首页</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">关于我们</Nav.Link>
        </Nav.Item>
        <Nav.Item className="fill">
          <Nav.Link eventKey="disabled" disabled>活动</Nav.Link>
        </Nav.Item>

        <NavDropdown title={langText} id="nav-dropdown" onSelect={k => this.handleSelect(k)}>
          {navComArr}
        </NavDropdown>
      </Nav>

      <div className="main-area">
        <h1>我的书架</h1>
        <ul>
          {(this.state.books || []).map((item, i)=>{
            return <li key={i}>
              <span>{i+1}. </span>
              <span style={{marginLeft: "30px"}}>{item.name}</span>
              <a style={{color: "blue", marginLeft: "30px"}}>{item.author}</a>
            </li>
          })}
        </ul>

        <Button variant="outline-primary" onClick={this.handleShow}>加一本</Button>

        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>加一本书</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input ref="inputName" placeholder={"请输入书名"}/>
            <input ref="inputAuthor" placeholder={"请输入作者"}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>关闭</Button>
            <Button variant="primary" onClick={this.addNewBook.bind(this)}>提交</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  }
}

// const mapDispatchToProps = { startClock }
export default connect(
  state => {
    return {
      locales: state.lang.locales,
      $lang: state.lang.lang,
    };
  }, {}
)(Index);
