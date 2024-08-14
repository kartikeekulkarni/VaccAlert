import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateVaccineStock() {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract the vaccine stock ID and initial stock from the location state
    const { vsid, initialStock, vaccineName } = location.state || {};
    const [stock, setStock] = useState(initialStock);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/updatevaccstock/${vsid}/${stock}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                alert("Stock updated successfully!");
                navigate("/hospitalhome/vaccine_stock");
            } else {
                alert("Failed to update stock.");
            }
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Update Vaccine Stock</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Vaccine ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={vsid}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Vaccine Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={vaccineName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Stock
                </button>
                <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => navigate("/hospitalhome/vaccine_stock")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}