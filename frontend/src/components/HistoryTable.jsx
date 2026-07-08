import "../styles/dashboard.css";

function HistoryTable({ history }) {

    return(

        <div className="history-card">

            <h2>Prediction History</h2>

            <table>

                <thead>

                    <tr>

                        <th>City</th>

                        <th>State</th>

                        <th>AQI</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        history.map(item=>(

                            <tr key={item.id}>

                                <td>{item.city}</td>

                                <td>{item.state}</td>

                                <td>{item.predicted_aqi}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}

export default HistoryTable;