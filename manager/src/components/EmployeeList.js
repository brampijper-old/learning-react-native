import _ from 'lodash'; 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { employeeFetch } from '../actions';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {
    componentDidMount() {
        this.props.employeeFetch();
    }

    renderItem({ item }) {
        return <EmployeeListItem employee={item} />;
    }

    render() {
        console.log(this.props);
        return (
            <FlatList
                data={this.props.employee}
                renderItem={this.renderItem}
            />
        );
    }
}

const mapStateToProps = state => {
    const employee = _.map(state.employee, (val, uid) => {
        return { ...val, uid }; // { shift: 'Monday', name: 'S', id: '30303' };
    }); 

    return { employee }; 
};

export default connect(mapStateToProps, { employeeFetch })(EmployeeList);

