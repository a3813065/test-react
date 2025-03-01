import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null); // 存儲選中的角色ID
  const [standImageExists, setStandImageExists] = useState(false); // 檢查stand圖片是否存在
  const [galleryImageExists, setGalleryImageExists] = useState(false); // 檢查gallery圖片是否存在

  useEffect(() => {
    axios.get(`https://huahaohuahua.ddns.net:5000/user_data?page=${currentPage}&limit=${itemsPerPage}`)
      .then((response) => {
        setTodos(response.data.data); // 只取 `data` 部分
        setTotalPages(response.data.totalPages); // 設定總頁數
      });
  }, [currentPage]); // `currentPage` 改變時重新請求 API

  const handleImageClick = (characterID) => {
    setSelectedCharacter(characterID); // 設定選中的角色ID

    // 檢查stand圖片是否存在
    checkImageExists(`https://huahaohuahua.ddns.net:669/character/${characterID}/image/stand.png`, setStandImageExists);
    checkImageExists(`https://huahaohuahua.ddns.net:669/character/${characterID}/image/main.png`, setGalleryImageExists);

  };

  // 檢查圖片是否存在
  const checkImageExists = (url, setExists) => {
    const img = new Image();
    img.onload = () => setExists(true);  // 圖片加載成功
    img.onerror = () => setExists(false);  // 圖片加載失敗
    img.src = url;
  };

  return (
    <div>
      <h1>User Data</h1>
      
      {/* 圖片顯示區域 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)", // 4 列
        gap: "10px",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {todos.map((todo) => (
          <div key={todo.characterID} style={{ textAlign: "center" }}>
            <button
              style={{
                background: "none",
                border: "none",
                padding: "0",
                cursor: "pointer",
                display: "inline-block",
              }}
              onClick={() => handleImageClick(todo.characterID)}
            >
              <img 
                src={`https://huahaohuahua.ddns.net:669/character/${todo.characterID}/image/thumb.png`} 
                alt={`Character ${todo.characterID}`} 
                width={100} 
              />
            </button>
          </div>
        ))}
      </div>

      {/* 分頁按鈕 */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          上一頁
        </button>
        <span style={{ margin: "0 5px" }}>頁數 {currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          下一頁
        </button>
      </div>

      {/* 顯示選中角色的圖片 */}
      {selectedCharacter && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {standImageExists && (
            <div>
              <img 
                src={`https://huahaohuahua.ddns.net:669/character/${selectedCharacter}/image/stand.png`} 
                alt="Stand" 
                width={400} 
              />
            </div>
          )}
          {setGalleryImageExists && (
            <div>
              <img 
                src={`https://huahaohuahua.ddns.net:669/character/${selectedCharacter}/image/main.png`} 
                alt="Gallery" 
                width={400} 
              />
            </div>
          )}


          {/* 如果兩張圖片都不存在，顯示提示 */}
          {!standImageExists && setGalleryImageExists &&(
            <p>該角色的圖片未找到</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
