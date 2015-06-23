/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    NavigatorIOS,
    } = React;

var _ = require('lodash');
var DDPClient = require("ddp-client");

var ListDetails = require('./ListDetails');

var ListsList = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => !_.isEqual(row1, row2),
            }),
            loaded: false,
        };
    },

    componentDidMount: function() {
        var ddpClient = new DDPClient({url: 'ws://localhost:3000/websocket'});

        ddpClient.connect(() => ddpClient.subscribe('publicLists'));

        // observe the lists collection
        var observer = ddpClient.observe("lists");
        observer.added = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.lists)));
        observer.changed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.lists)));
        observer.removed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.lists)));
    },

    updateRows: function(rows) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rows),
            loaded: true,
        });
    },

    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderList}
                style={styles.listView}
            />
        );
    },

    renderLoadingView: function() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading lists...
                </Text>
            </View>
        );
    },

    renderList: function(list) {
        return (
            <TouchableHighlight onPress={() => this.showListDetails(list)}>
                <View style={styles.row}>
                    <Image
                        style={styles.thumbnail}
                        source={{uri: 'http://i.imgur.com/91AR0Lo.jpg'}}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>
                            {list.title}
                        </Text>
                        <Text style={styles.teaser}>
                            {list.teaser}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },

    showListDetails: function(list) {
        this.props.navigator.push({
            title: list.title,
            component: ListDetails,
            passProps: {list}
        });
    }

});

var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    label: {
        fontSize: 24,
        fontWeight: 'normal',
        color: '#fff',
    },
    listView: {
    },
    rightContainer: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingRight: 20,
        marginTop: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    teaser: {
        fontSize: 12,
        fontWeight: 'normal'
    },
    thumbnail: {
        width: 70,
        height: 108,
        marginRight: 16,
    }
});

module.exports = ListsList;