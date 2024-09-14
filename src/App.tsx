import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useData } from "./hooks/useData";

function App() {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [selectedArticles, setSelectedArticles] = useState<any[]>([]);
  const { results, isLoading, pagination, isError } = useData(page);
  const overlayPanelRef = useRef<any>(null);

  useEffect(() => {
    const storedInputValue = localStorage.getItem("inputValue");
    if (storedInputValue) setInputValue(storedInputValue);
  }, []);

  const onPageChange = (e: any) => {
    setPage(e.page + 1);
  };

  const onSelectionChange = (e: any) => {
    setSelectedArticles(e.value);
  };

  const handleIconClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    overlayPanelRef.current?.toggle(event);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    localStorage.setItem("inputValue", newValue);
  };

  useEffect(() => {
    const numberOfRows = parseInt(inputValue, 10);
    const limit = pagination?.limit || 12;
    if (!isNaN(numberOfRows) && numberOfRows > 0) {
      if (numberOfRows <= page * limit) {
        setSelectedArticles(results.slice(0, numberOfRows % limit));
      } else {
        setSelectedArticles(results.slice(0, numberOfRows));
      }
    }
  }, [results, inputValue, page]);

  const handleSubmit = () => {
    overlayPanelRef.current?.hide();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="app-container">
      <DataTable
        value={results}
        paginator
        rows={pagination?.limit || 10}
        totalRecords={pagination?.total || 0}
        lazy
        first={(page - 1) * (pagination?.limit || 10)}
        onPage={onPageChange}
        selection={selectedArticles}
        onSelectionChange={onSelectionChange}
        dataKey="id"
        selectionMode="multiple"
        className="styled-table"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column>

        <Column
          field="title"
          header={
            <span className="table-header" onClick={handleIconClick}>
              <i className="pi pi-chevron-down table-icon"></i>
              Title
            </span>
          }
        ></Column>
        <Column field="place_of_origin" header="Place Of Origin"></Column>
        <Column field="artist_display" header="Artist Display"></Column>
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="Date End"></Column>
      </DataTable>

      <OverlayPanel ref={overlayPanelRef} className="styled-overlay">
        <div className="overlay-content">
          <InputText
            placeholder="Enter value"
            value={inputValue}
            onChange={handleInputChange}
            className="p-inputtext-lg overlay-input"
          />
          <Button
            label="Submit"
            onClick={handleSubmit}
            className="p-button-rounded overlay-btn"
          />
        </div>
      </OverlayPanel>
    </main>
  );
}

export default App;
