export default () => (`
    constructor(props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {}
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {

        }
    }

    componentWillUnmount() {

    }
`)
