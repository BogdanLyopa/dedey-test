import { useState } from "react";
import * as XLSX from "xlsx";
import Table from "../Table/Table";
import postData from "../../services/postData";
import "./FileDrop.scss";

let files;
export default function FileDrop() {
  const [drag, setDrag] = useState(false);
  const [validationMessage, setvalidationMessage] = useState("");
  const [file, setFile] = useState(null);
  const [parseFile, setParseFile] = useState([]);

  const dragStartHandler = (event) => {
    event.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
    setDrag(false);
  };
  const validation = (file) => {
    if (file[0].size > 10000000) {
      setvalidationMessage("Допустимий размер файла 10мб,выберите другой файл");
      setDrag(false);
      setParseFile([]);
    }
    if (
      file[0].type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      file[0].type !== "application/vnd.ms-excel"
    ) {
      setDrag(false);
      setvalidationMessage(
        `Недопустимий тип файла ${file[0].type},выберите другой файл`
      );
      setParseFile([]);
    } else {
      setvalidationMessage(`Файл - ${file[0].name}`);
      setFile(file[0]);
      setDrag(false);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file[0]);
      reader.onload = async function () {
        const wb = XLSX.read(reader.result, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        setParseFile(data);
        postData(data);
      };
    }
  };
  const onDropHandler = (event) => {
    event.preventDefault();

    files = event.dataTransfer.files;

    validation(files);
  };
  const onChangeHandler = (event) => {
    event.preventDefault();
    files = event.target.files;

    validation(files);
  };

  return (
    <div>
      <form className="file-form" action="" type="POST">
        {drag ? (
          <p
            onDragStart={(event) => dragStartHandler(event)}
            onDragLeave={(event) => dragLeaveHandler(event)}
            onDragOver={(event) => dragStartHandler(event)}
            onDrop={(event) => onDropHandler(event)}
          >
            Отпустите файл для загрузки
          </p>
        ) : (
          <p
            onDragStart={(event) => dragStartHandler(event)}
            onDragLeave={(event) => dragLeaveHandler(event)}
            onDragOver={(event) => dragStartHandler(event)}
            onDrop={(event) => onDropHandler(event)}
          >
            {validationMessage
              ? validationMessage
              : "Перетащите сюда файл или нажмите чтобы выбрать"}
          </p>
        )}
        <input
          onChange={(event) => onChangeHandler(event)}
          className="file-input"
          type="file"
          name="files"
          id="files"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </form>
      {parseFile.length > 0 && <Table items={parseFile} />}
    </div>
  );
}
