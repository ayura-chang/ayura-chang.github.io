"use client"
import { useState, useEffect } from "react";
import axios from "axios";

interface Prediction {
    Gender: number;
    Age: number;
    Course: string;
    Depression: number;
}

function MentalHealthPredictions() {
    const [accuracy, setAccuracy] = useState("");
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    const API = 'https://backenddatamining-production.up.railway.app'

    // Fetch data on component mount
    useEffect(() => {
        axios.get(`${API}/predict`)
            .then(response => {
                // Menyimpan data prediksi ke state
                setPredictions(response.data.predictions);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });

        axios.get(`${API}/accuracy`)
            .then(response => {
                setAccuracy(response.data.accuracy)
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="keseluruhan">
            <div className="container-atas">
                <h1 >MENTAL HEALT PREDICTIONS</h1>
                <h2 >Model Accuracy</h2>
                <p className="akurasi">{accuracy}</p>
                <p className="female">Female : 98 orang</p>
                <p className="male">Male : 94 orang</p>
                <h2>Predictions</h2>
            </div>

            <div className="tabel">
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Course</th>
                            <th>Depression</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions.length > 0 ? (
                            predictions.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.Gender === 0 ? "Female" : "Male"}</td>
                                    <td>{item?.Age ?? "N/A"}</td>
                                    <td>{item?.Course ?? "Unknown"}</td>
                                    <td>{item?.Depression === 1 ? "Yes" : "No"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MentalHealthPredictions;