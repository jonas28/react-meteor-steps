'use strict';
var React = require('react-native');
var {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    } = React;

var ListDetails = React.createClass({
    render: function() {
        return (
            <ScrollView>
                <View style={styles.topContainer}>
                    <Image
                        style={styles.thumbnail}
                        source={{uri: 'http://i.imgur.com/91AR0Lo.jpg'}} />
                    <View style={styles.titlesContainer}>
                        <Text style={styles.title}>
                            {this.props.list.title}
                        </Text>
                    </View>
                </View>
                <View style={styles.middleContainer}>
                    <Text style={styles.description}> {this.props.list.description}
                    </Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.metainfos}>
                        Exports: {this.props.list.exports}
                        Exports: {this.props.list.exports}
                    </Text>
                </View>
            </ScrollView>
        );
    }
});

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#5AC8FA',
    },
    thumbnail: {
        width: 70,
        height: 108,
        marginRight: 16,
    },
    titlesContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#5AC8FA',
        width: windowSize.width - 86,
        paddingTop: 8,
        paddingRight: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#fff',
    },
    middleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        margin: 16,
    },
    description: {
        fontFamily: 'Times',
        fontSize: 16,
        fontWeight: 'normal',
        marginBottom: 8,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#5AC8FA',
        padding: 8,
    },
    metainfos: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#fff',
    },

});

module.exports = ListDetails;


