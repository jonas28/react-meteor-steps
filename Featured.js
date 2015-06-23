'use strict';

var React = require('react-native');
var ListsList = require('./ListsList');

var {
    StyleSheet,
    NavigatorIOS,
    Component
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Featured extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'Featured Lists',
                    component: ListsList
                }}/>

        );
    }
}

module.exports = Featured;