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

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {

        }
    }

    componentDidCatch(error, info) {
        console.log(error);
        this.setState(state => ({...state, hasError: true}))
    }

    componentWillUnmount() {

    }
`)
