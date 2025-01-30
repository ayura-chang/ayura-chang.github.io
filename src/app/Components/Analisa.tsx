"use client"
import { useState, useEffect } from "react";
import axios from "axios";

function MentalHealthPredictions() {
    const [accuracy, setAccuracy] = useState("");
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch accuracy from backend
    const fetchAccuracy = async () => {
        try {
            const response = await axios.get("https://backenddatamining-production.up.railway.app/accuracy");
            setAccuracy(response.data.accuracy);
        } catch (err) {
            setError("Failed to fetch accuracy: ", err);
        }
    };

    // Fetch predictions from backend
    const fetchPredictions = async () => {
        try {
            const response = await axios.get("https://backenddatamining-production.up.railway.app/predict");
            setPredictions(response.data.predictions);
        } catch (err) {
            setError("Failed to fetch predictions:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchAccuracy();
        fetchPredictions();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

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
                <table border="1">
                    <thead>
                        <tr>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Course</th>
                            <th>Depression</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Gender === 0 ? "Female" : "Male"}</td>
                                <td>{item.Age}</td>
                                <td>{item.Course}</td>
                                <td>{item.Depression === 1 ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MentalHealthPredictions;