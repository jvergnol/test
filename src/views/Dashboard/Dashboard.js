import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ServicesLogin from '../Pages/Login/ServicesLogin'
import ServicesDashboard from './ServicesDashboard'
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from "moment";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.MySwal = withReactContent(Swal)
    this.getData = this.getData.bind(this);
    this.state = {
        redirectToReferrer: 'false',
        data : ''
    };




    this.getData();
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  getData(){
          ServicesDashboard.getData()
            .then(response => {
                console.log('response',response.data)
                // this.state.redirectToReferrer = 2323
                let row = []

            response.data.map((item) => {
                 let date = new Date(item.bookingTime*1000)
                 row.push({
                     bookingId:item.bookingId,
                     name:item.locationId.tutenUser.firstName+' '+item.locationId.tutenUser.lastName,
                     bookingTime:moment(item.bookingTime).format("DD/MM/YYYY"),
                     streetAddress: item.locationId.streetAddress,
                     bookingPrice: '$'+item.bookingPrice,
                 })
             }
             )

                this.state.data =
                {
                    columns: [
                  {
                    label: 'BookingId',
                    field: 'bookingId',
                    sort: 'asc',
                    width: 150
                  },
                  {
                    label: 'Cliente',
                    field: 'name',
                    sort: 'asc',
                    width: 270
                  },
                  {
                    label: 'Fecha de Creación',
                    field: 'bookingTime',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Dirección',
                    field: 'streetAddress',
                    sort: 'asc',
                    width: 100
                  },
                  {
                    label: 'Precio',
                    field: 'bookingPrice',
                    sort: 'asc',
                    width: 150
                  },
                ],
                rows: row
            }
                this.setState({response: true});

            })
            .catch(error => {
                console.log(error)
                this.MySwal.fire({
                              text:  error.data,
                              type:  'warning',
                              showCancelButton: false})
            })


  }

  render() {

      if (!ServicesLogin.isLoguedIn()) {
          return (<Redirect to={'/login'}/>)
      }

    return (
      <div className="animated fadeIn">
      <MDBDataTable
           striped
           bordered
           hover
           data={this.state.data}
         />
      </div>
    );
  }
}

export default Dashboard;
