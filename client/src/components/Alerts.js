import React from 'react'
import { Alert } from 'reactstrap'
import { connect } from 'react-redux'

const Alerts = props => {
    return (
        props.warnings.length > 0 && props.warnings.map(alert => (
            <Alert key={alert.id} color={alert.type}>
                {alert.msg}
            </Alert>
        ))

    )
}

const mapStateToProps = state => {
    return {
        warnings: state.alert
    }
}

export default connect(mapStateToProps)(Alerts)
