export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Giới thiệu chung
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-blue-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Tầm nhìn</h3>
            <p className="text-gray-700">
              Trở thành câu lạc bộ học thuật hàng đầu trực thuộc khoa Thống kê -
              Tin học tại trường Đại học Kinh Tế - Đại học Đà Nẵng, nơi trao đi
              những giá trị sâu sắc cho sinh viên trong khoảng thời gian học đại
              học và tương lai.
            </p>
          </div>

          <div className="bg-purple-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">Sứ mệnh</h3>
            <p className="text-gray-700">
              Mang đến một môi trường học thuật cạnh tranh, lành mạnh, giúp cải
              thiện kiến thức, kỹ năng, kinh nghiệm, các mối quan hệ theo đúng
              lĩnh vực công nghệ thông tin, phân tích trong kinh doanh, thông
              qua sự dẫn dắt chân thành, lòng biết ơn, và trách nhiệm cao của
              mỗi sinh viên là thành viên của câu lạc bộ.
            </p>
          </div>

          <div className="bg-indigo-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-indigo-600">
              Giá trị cốt lõi
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Tinh thần chia sẻ</li>
              <li>• Sự tương trợ</li>
              <li>• Sự chân thành</li>
              <li>• Sự tôn trọng</li>
              <li>• Sự trách nhiệm</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
