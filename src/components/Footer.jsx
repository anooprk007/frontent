export default function Footer() {
  return (
    <>
   <footer class="bg-gray-900 text-gray-400">
  <div class="max-w-7xl mx-auto px-4 py-12">
    {/* <!-- Top Links --> */}
    <div class="flex flex-wrap justify-center space-x-8 mb-8 text-sm">
      <a href="#" class="hover:text-white">About</a>
      <a href="#" class="hover:text-white">Blog</a>
      <a href="#" class="hover:text-white">Jobs</a>
      <a href="#" class="hover:text-white">Press</a>
      <a href="#" class="hover:text-white">Accessibility</a>
      <a href="#" class="hover:text-white">Partners</a>
    </div>

    {/* <!-- Social Icons --> */}
    <div class="flex justify-center space-x-6 mb-6 text-2xl">
      <a href="#" class="hover:text-white"><i class="fab fa-facebook"></i></a>
      <a href="#" class="hover:text-white"><i class="fab fa-instagram"></i></a>
      <a href="#" class="hover:text-white"><i class="fab fa-x-twitter"></i></a>
      <a href="#" class="hover:text-white"><i class="fab fa-github"></i></a>
      <a href="#" class="hover:text-white"><i class="fab fa-youtube"></i></a>
    </div>

    {/* <!-- Copyright --> */}
    <p class="text-center text-sm">&copy; 2024 Your Company, Inc. All rights reserved.</p>
  </div>
</footer>

{/* <!-- Font Awesome CDN (for icons) --> */}
<script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</>
  );
}
