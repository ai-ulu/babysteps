import React from 'react';
import { ThemeColor } from '../types';
import { AppData } from '../services/storageService';
import { Download, Upload } from 'lucide-react';

interface DataManagementProps {
  themeColor: ThemeColor;
  appData: AppData;
  onRestore: (data: AppData) => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ themeColor, appData, onRestore }) => {
  const handleExport = () => {
    try {
      const jsonString = JSON.stringify(appData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const date = new Date().toISOString().split('T')[0];
      link.download = `babysteps-backup-${date}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Veriler dışa aktarılırken bir hata oluştu.");
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          throw new Error("Dosya içeriği okunamadı.");
        }
        const data = JSON.parse(text) as AppData;

        // Basic validation to ensure it's a valid backup file
        if (data.profile && data.entries !== undefined) {
           if (window.confirm("Uyarı: Mevcut tüm verileriniz bu yedekle değiştirilecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?")) {
             onRestore(data);
           }
        } else {
          throw new Error("Geçersiz yedek dosyası formatı.");
        }
      } catch (error) {
        console.error("Error importing data:", error);
        alert("Veriler içe aktarılırken bir hata oluştu. Lütfen geçerli bir yedek dosyası seçtiğinizden emin olun.");
      } finally {
        // Reset file input so the same file can be re-uploaded
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white/10 p-4 rounded-xl border border-white/20 mt-4">
      <h4 className="text-sm font-bold text-white mb-3">Veri Yönetimi</h4>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleExport}
          className={`flex items-center justify-center gap-2 bg-emerald-500/80 text-white text-xs font-bold py-2 rounded-lg backdrop-blur-sm hover:bg-emerald-500 transition-colors`}
        >
          <Download size={12} />
          Dışa Aktar
        </button>
        <div>
          <input
            type="file"
            id="import-file"
            className="hidden"
            accept="application/json"
            onChange={handleImport}
          />
          <label
            htmlFor="import-file"
            className={`flex items-center justify-center gap-2 cursor-pointer bg-sky-500/80 text-white text-xs font-bold py-2 rounded-lg backdrop-blur-sm hover:bg-sky-500 transition-colors block text-center`}
          >
            <Upload size={12} />
            İçe Aktar
          </label>
        </div>
      </div>
       <p className={`text-[10px] text-white/70 mt-2`}>
        Cihazınızı değiştirirken veya verilerinizi güvence altına almak için bu özelliği kullanabilirsiniz.
      </p>
    </div>
  );
};

export default DataManagement;
