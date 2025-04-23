const geoCountries = [
  { country: "Abyei Area", lat: 9.6, lon: 28.8, Total: 5454, Earthquake: 0, Storm: 0, Flood: 1045, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Afghanistan", lat: 33.9391, lon: 67.71, Total: 1743168, Earthquake: 210490, Storm: 2954, Flood: 5734, Wildfire: 0, Drought: 21874, Most_Affected_By: "Earthquake" },
  { country: "Albania", lat: 41.1533, lon: 20.1683, Total: 15, Earthquake: 0, Storm: 0, Flood: 15, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Algeria", lat: 28.0339, lon: 1.6596, Total: 25901, Earthquake: 0, Storm: 0, Flood: 1796, Wildfire: 24105, Drought: 0, Most_Affected_By: "Wildfire" },
  { country: "Angola", lat: -11.2027, lon: 17.8739, Total: 101335, Earthquake: 0, Storm: 98750, Flood: 2585, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Antigua and Barbuda", lat: 17.0608, lon: -61.7964, Total: 300, Earthquake: 0, Storm: 300, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Argentina", lat: -38.4161, lon: -63.6167, Total: 11459, Earthquake: 0, Storm: 1308, Flood: 8698, Wildfire: 1445, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Australia", lat: -25.2744, lon: 133.7751, Total: 7316, Earthquake: 0, Storm: 3011, Flood: 3277, Wildfire: 1029, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Austria", lat: 47.5162, lon: 14.5501, Total: 875, Earthquake: 0, Storm: 84, Flood: 630, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Azerbaijan", lat: 40.1431, lon: 47.5769, Total: 1692, Earthquake: 0, Storm: 0, Flood: 1692, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Bangladesh", lat: 23.6849, lon: 90.3563, Total: 1851702, Earthquake: 0, Storm: 1591038, Flood: 254249, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Barbados", lat: 13.1939, lon: -59.5432, Total: 29, Earthquake: 0, Storm: 29, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Belarus", lat: 53.7098, lon: 27.9534, Total: 48, Earthquake: 0, Storm: 0, Flood: 48, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Belgium", lat: 50.5039, lon: 4.4699, Total: 199, Earthquake: 0, Storm: 0, Flood: 199, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Bolivia", lat: -16.2902, lon: -63.5887, Total: 5893, Earthquake: 0, Storm: 584, Flood: 4336, Wildfire: 973, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Bosnia and Herzegovina", lat: 43.9159, lon: 17.6791, Total: 125, Earthquake: 0, Storm: 105, Flood: 20, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Botswana", lat: -22.3285, lon: 24.6849, Total: 248, Earthquake: 0, Storm: 0, Flood: 248, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Brazil", lat: -14.235, lon: -51.9253, Total: 761111, Earthquake: 0, Storm: 518461, Flood: 207164, Wildfire: 98, Drought: 31641, Most_Affected_By: "Storm" },
  { country: "Bulgaria", lat: 42.7339, lon: 25.4858, Total: 252, Earthquake: 0, Storm: 250, Flood: 0, Wildfire: 2, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Burkina Faso", lat: 12.2383, lon: -1.5616, Total: 24139, Earthquake: 0, Storm: 0, Flood: 24139, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Burundi", lat: -3.3731, lon: 29.9189, Total: 86404, Earthquake: 0, Storm: 7841, Flood: 12321, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Cambodia", lat: 12.5657, lon: 104.991, Total: 50259, Earthquake: 0, Storm: 8738, Flood: 40812, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Cameroon", lat: 3.848, lon: 11.5021, Total: 33821, Earthquake: 0, Storm: 315, Flood: 33478, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Canada", lat: 56.1304, lon: -106.3468, Total: 204297, Earthquake: 0, Storm: 444, Flood: 8524, Wildfire: 195174, Drought: 0, Most_Affected_By: "Wildfire" },
  { country: "Central African Republic", lat: 6.6111, lon: 20.9394, Total: 69991, Earthquake: 0, Storm: 500, Flood: 69491, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Chad", lat: 15.4542, lon: 18.7322, Total: 101989, Earthquake: 0, Storm: 0, Flood: 101989, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Chile", lat: -35.6751, lon: -71.543, Total: 49482, Earthquake: 0, Storm: 33031, Flood: 10617, Wildfire: 5552, Drought: 0, Most_Affected_By: "Storm" },
  { country: "China", lat: 35.8617, lon: 104.1954, Total: 5614604, Earthquake: 124551, Storm: 3463346, Flood: 1938060, Wildfire: 2351, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Colombia", lat: 4.5709, lon: -74.2973, Total: 350653, Earthquake: 889, Storm: 91292, Flood: 205101, Wildfire: 46534, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Congo", lat: -0.228, lon: 15.8277, Total: 163403, Earthquake: 0, Storm: 0, Flood: 163403, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Costa Rica", lat: 9.7489, lon: -83.7534, Total: 297, Earthquake: 0, Storm: 18, Flood: 279, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Croatia", lat: 45.1, lon: 15.2, Total: 106, Earthquake: 0, Storm: 71, Flood: 35, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Cuba", lat: 21.5218, lon: -77.7812, Total: 45121, Earthquake: 0, Storm: 15595, Flood: 29456, Wildfire: 70, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Cyprus", lat: 35.1264, lon: 33.4299, Total: 67, Earthquake: 0, Storm: 0, Flood: 0, Wildfire: 67, Drought: 0, Most_Affected_By: "Wildfire" },
  { country: "Czech Republic", lat: 49.8175, lon: 15.473, Total: 64, Earthquake: 0, Storm: 0, Flood: 64, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Côte d'Ivoire", lat: 7.5399, lon: -5.5471, Total: 1208, Earthquake: 0, Storm: 0, Flood: 1208, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Dem. Rep. Congo", lat: -4.0383, lon: 21.7587, Total: 269259, Earthquake: 0, Storm: 11238, Flood: 110834, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Denmark", lat: 56.2639, lon: 9.5018, Total: 734, Earthquake: 0, Storm: 732, Flood: 0, Wildfire: 2, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Dominican Republic", lat: 18.7357, lon: -70.1627, Total: 42020, Earthquake: 0, Storm: 40547, Flood: 1473, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Ecuador", lat: -1.8312, lon: -78.1834, Total: 21484, Earthquake: 2616, Storm: 331, Flood: 17191, Wildfire: 15, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Egypt", lat: 26.8206, lon: 30.8025, Total: 9, Earthquake: 0, Storm: 0, Flood: 9, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "El Salvador", lat: 13.7942, lon: -88.8965, Total: 4899, Earthquake: 3252, Storm: 1545, Flood: 0, Wildfire: 102, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Ethiopia", lat: 9.145, lon: 40.4897, Total: 1498496, Earthquake: 0, Storm: 0, Flood: 788761, Wildfire: 0, Drought: 680405, Most_Affected_By: "Flood" },
  { country: "Fiji", lat: -17.7134, lon: 178.065, Total: 7081, Earthquake: 0, Storm: 6381, Flood: 700, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Finland", lat: 61.9241, lon: 25.7482, Total: 2, Earthquake: 0, Storm: 0, Flood: 2, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "France", lat: 46.6034, lon: 1.8883, Total: 8181, Earthquake: 568, Storm: 3809, Flood: 411, Wildfire: 3369, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Gabon", lat: -0.8037, lon: 11.6094, Total: 1785, Earthquake: 0, Storm: 0, Flood: 1785, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Gambia", lat: 13.4432, lon: -15.3101, Total: 5286, Earthquake: 0, Storm: 0, Flood: 5286, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Georgia", lat: 42.3154, lon: 43.3569, Total: 40218, Earthquake: 0, Storm: 336, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Germany", lat: 51.1657, lon: 10.4515, Total: 3453, Earthquake: 0, Storm: 70, Flood: 3213, Wildfire: 160, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Ghana", lat: 7.9465, lon: -1.0232, Total: 86209, Earthquake: 0, Storm: 0, Flood: 85789, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Greece", lat: 39.0742, lon: 21.8243, Total: 126474, Earthquake: 0, Storm: 26738, Flood: 74, Wildfire: 99636, Drought: 0, Most_Affected_By: "Wildfire" },
  { country: "Guam", lat: 13.4443, lon: 144.7937, Total: 1582, Earthquake: 0, Storm: 1582, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Guatemala", lat: 15.7835, lon: -90.2308, Total: 47508, Earthquake: 332, Storm: 44431, Flood: 181, Wildfire: 42, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Guinea", lat: 9.9456, lon: -9.6966, Total: 36688, Earthquake: 0, Storm: 0, Flood: 36688, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Guyana", lat: 4.8604, lon: -58.9302, Total: 62, Earthquake: 0, Storm: 62, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Haiti", lat: 18.9712, lon: -72.2852, Total: 12335, Earthquake: 164, Storm: 9119, Flood: 500, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Honduras", lat: 15.2, lon: -86.2419, Total: 5787, Earthquake: 9, Storm: 743, Flood: 4579, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Hong Kong, China", lat: 22.3193, lon: 114.1694, Total: 1261, Earthquake: 0, Storm: 1261, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Hungary", lat: 47.1625, lon: 19.5033, Total: 66, Earthquake: 0, Storm: 16, Flood: 50, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Iceland", lat: 64.9631, lon: -19.0208, Total: 8056, Earthquake: 0, Storm: 0, Flood: 155, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "India", lat: 20.5937, lon: 78.9629, Total: 614911, Earthquake: 0, Storm: 206614, Flood: 402936, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Indonesia", lat: -0.7893, lon: 113.9213, Total: 252388, Earthquake: 31485, Storm: 12258, Flood: 188728, Wildfire: 6754, Drought: 38, Most_Affected_By: "Flood" },
  { country: "Iran", lat: 32.4279, lon: 53.688, Total: 123853, Earthquake: 104972, Storm: 13806, Flood: 5075, Wildfire: 0, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Iraq", lat: 33.2232, lon: 43.6793, Total: 126752, Earthquake: 0, Storm: 0, Flood: 0, Wildfire: 0, Drought: 126752, Most_Affected_By: "Drought" },
  { country: "Ireland", lat: 53.1424, lon: -7.6921, Total: 21, Earthquake: 0, Storm: 13, Flood: 8, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Isle of Man", lat: 54.2361, lon: -4.5481, Total: 9, Earthquake: 0, Storm: 0, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Israel", lat: 31.0461, lon: 34.8516, Total: 53, Earthquake: 0, Storm: 0, Flood: 0, Wildfire: 53, Drought: 0, Most_Affected_By: "Wildfire" },
  { country: "Italy", lat: 41.8719, lon: 12.5674, Total: 42595, Earthquake: 40, Storm: 37435, Flood: 1250, Wildfire: 3583, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Japan", lat: 36.2048, lon: 138.2529, Total: 38325, Earthquake: 29809, Storm: 5766, Flood: 2750, Wildfire: 0, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Jersey", lat: 49.2144, lon: -2.1313, Total: 84, Earthquake: 0, Storm: 84, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Jordan", lat: 30.5852, lon: 36.2384, Total: 320, Earthquake: 0, Storm: 320, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Kazakhstan", lat: 48.0196, lon: 66.9237, Total: 1749, Earthquake: 0, Storm: 0, Flood: 1677, Wildfire: 72, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Kenya", lat: -1.2921, lon: 36.8219, Total: 769980, Earthquake: 0, Storm: 2000, Flood: 740004, Wildfire: 0, Drought: 27976, Most_Affected_By: "Flood" },
  { country: "Korea", lat: 35.9078, lon: 127.7669, Total: 46270, Earthquake: 0, Storm: 20328, Flood: 22086, Wildfire: 3209, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Kosovo", lat: 42.6026, lon: 20.902, Total: 807, Earthquake: 0, Storm: 0, Flood: 807, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Kyrgyzstan", lat: 41.2044, lon: 74.7661, Total: 57, Earthquake: 0, Storm: 0, Flood: 18, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Lao PDR", lat: 19.8563, lon: 102.4955, Total: 1681, Earthquake: 0, Storm: 0, Flood: 1681, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Lebanon", lat: 33.8547, lon: 35.8623, Total: 171, Earthquake: 0, Storm: 171, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Lesotho", lat: -29.6099, lon: 28.2336, Total: 770, Earthquake: 0, Storm: 770, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Liberia", lat: 6.4281, lon: -9.4295, Total: 14234, Earthquake: 0, Storm: 350, Flood: 13884, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Libya", lat: 26.3351, lon: 17.2283, Total: 52618, Earthquake: 0, Storm: 7402, Flood: 45216, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Lithuania", lat: 55.1694, lon: 23.8813, Total: 0, Earthquake: 0, Storm: 0, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Macao, China", lat: 22.1987, lon: 113.5439, Total: 3124, Earthquake: 0, Storm: 3124, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Madagascar", lat: -18.7669, lon: 46.8691, Total: 117456, Earthquake: 0, Storm: 117456, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Malawi", lat: -13.2543, lon: 34.3015, Total: 685731, Earthquake: 0, Storm: 685382, Flood: 348, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Malaysia", lat: 4.2105, lon: 101.9758, Total: 215400, Earthquake: 0, Storm: 39, Flood: 215150, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Maldives", lat: 3.2028, lon: 73.2207, Total: 108, Earthquake: 0, Storm: 0, Flood: 108, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Mali", lat: 17.5707, lon: -3.9962, Total: 9102, Earthquake: 0, Storm: 0, Flood: 1085, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Mauritania", lat: 21.0079, lon: -10.9408, Total: 1101, Earthquake: 0, Storm: 0, Flood: 1101, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Mauritius", lat: -20.3484, lon: 57.5522, Total: 2420, Earthquake: 0, Storm: 562, Flood: 1858, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Mexico", lat: 23.6345, lon: -102.5528, Total: 230329, Earthquake: 35, Storm: 229475, Flood: 362, Wildfire: 412, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Micronesia", lat: 7.4256, lon: 150.5508, Total: 5, Earthquake: 0, Storm: 5, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Mongolia", lat: 46.8625, lon: 103.8467, Total: 4962, Earthquake: 0, Storm: 0, Flood: 3185, Wildfire: 345, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Montenegro", lat: 42.7087, lon: 19.3744, Total: 1, Earthquake: 0, Storm: 0, Flood: 1, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Morocco", lat: 31.7917, lon: -7.0926, Total: 584246, Earthquake: 584065, Storm: 0, Flood: 0, Wildfire: 181, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Mozambique", lat: -18.6657, lon: 35.5296, Total: 770297, Earthquake: 0, Storm: 640398, Flood: 129899, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Myanmar", lat: 21.9162, lon: 95.956, Total: 1230687, Earthquake: 0, Storm: 1149012, Flood: 80042, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Namibia", lat: -22.9576, lon: 18.4904, Total: 1162, Earthquake: 0, Storm: 18, Flood: 1144, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Nepal", lat: 28.3949, lon: 84.124, Total: 155700, Earthquake: 153133, Storm: 336, Flood: 1571, Wildfire: 50, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Netherlands", lat: 52.1326, lon: 5.2913, Total: 0, Earthquake: 0, Storm: 0, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "New Caledonia", lat: -20.9043, lon: 165.618, Total: 2, Earthquake: 2, Storm: 0, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "New Zealand", lat: -40.9006, lon: 174.886, Total: 18075, Earthquake: 0, Storm: 13605, Flood: 4266, Wildfire: 27, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Nicaragua", lat: 12.8654, lon: -85.2072, Total: 816, Earthquake: 0, Storm: 0, Flood: 816, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Niger", lat: 17.6078, lon: 8.0817, Total: 102582, Earthquake: 0, Storm: 0, Flood: 70990, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Nigeria", lat: 9.082, lon: 8.6753, Total: 242947, Earthquake: 0, Storm: 23173, Flood: 145074, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Northern Mariana Islands", lat: 17.3308, lon: 145.3847, Total: 1140, Earthquake: 0, Storm: 1140, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Norway", lat: 60.472, lon: 8.4689, Total: 6212, Earthquake: 0, Storm: 6075, Flood: 9, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Oman", lat: 21.4735, lon: 55.9754, Total: 4471, Earthquake: 0, Storm: 4471, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Pakistan", lat: 30.3753, lon: 69.3451, Total: 1946544, Earthquake: 195, Storm: 84763, Flood: 1861498, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Panama", lat: 8.538, lon: -80.7821, Total: 31, Earthquake: 0, Storm: 31, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Papua New Guinea", lat: -6.3149, lon: 143.9555, Total: 20592, Earthquake: 1243, Storm: 0, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Paraguay", lat: -23.4425, lon: -58.4438, Total: 16211, Earthquake: 0, Storm: 112, Flood: 16099, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Peru", lat: -9.1899, lon: -75.0152, Total: 221714, Earthquake: 403, Storm: 8982, Flood: 203738, Wildfire: 469, Drought: 27, Most_Affected_By: "Flood" },
  { country: "Philippines", lat: 12.8797, lon: 121.774, Total: 2889834, Earthquake: 466890, Storm: 1267712, Flood: 1132755, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Portugal", lat: 39.3999, lon: -8.2245, Total: 1738, Earthquake: 0, Storm: 109, Flood: 108, Wildfire: 1521, Drought: 0, Most_Affected_By: "Wildfire" },
  { country: "Romania", lat: 45.9432, lon: 24.9668, Total: 51, Earthquake: 0, Storm: 51, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Russia", lat: 61.524, lon: 105.3188, Total: 17388, Earthquake: 0, Storm: 6060, Flood: 7324, Wildfire: 4004, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Rwanda", lat: -1.9403, lon: 29.8739, Total: 95837, Earthquake: 0, Storm: 62919, Flood: 32918, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Réunion", lat: -21.1151, lon: 55.5364, Total: 80, Earthquake: 0, Storm: 80, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Samoa", lat: -13.759, lon: -172.1046, Total: 9, Earthquake: 0, Storm: 0, Flood: 9, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Serbia", lat: 44.0165, lon: 21.0059, Total: 401, Earthquake: 0, Storm: 401, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Slovakia", lat: 48.669, lon: 19.699, Total: 86, Earthquake: 44, Storm: 0, Flood: 42, Wildfire: 0, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Slovenia", lat: 46.1512, lon: 14.9955, Total: 8175, Earthquake: 0, Storm: 8018, Flood: 30, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Solomon Islands", lat: -9.6457, lon: 160.1562, Total: 1026, Earthquake: 0, Storm: 1026, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Somalia", lat: 5.1521, lon: 46.1996, Total: 2043426, Earthquake: 0, Storm: 0, Flood: 1711571, Wildfire: 0, Drought: 330895, Most_Affected_By: "Flood" },
  { country: "South Africa", lat: -30.5595, lon: 22.9375, Total: 33076, Earthquake: 0, Storm: 1620, Flood: 30728, Wildfire: 729, Drought: 0, Most_Affected_By: "Flood" },
  { country: "South Sudan", lat: 6.877, lon: 31.307, Total: 729195, Earthquake: 0, Storm: 0, Flood: 726545, Wildfire: 0, Drought: 2650, Most_Affected_By: "Flood" },
  { country: "Spain", lat: 40.4637, lon: -3.7492, Total: 28662, Earthquake: 0, Storm: 110, Flood: 277, Wildfire: 28163, Drought: 0, Most_Affected_By: "Wildfire" },
  { country: "Sri Lanka", lat: 7.8731, lon: 80.7718, Total: 17971, Earthquake: 0, Storm: 292, Flood: 13610, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "St. Vincent and the Grenadines", lat: 13.2528, lon: -61.1971, Total: 150, Earthquake: 0, Storm: 150, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Sudan", lat: 12.8628, lon: 30.2176, Total: 36400, Earthquake: 0, Storm: 0, Flood: 36400, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Switzerland", lat: 46.8182, lon: 8.2275, Total: 496, Earthquake: 0, Storm: 0, Flood: 9, Wildfire: 205, Drought: 0, Most_Affected_By: "Wildfire" },
  { country: "Syria", lat: 34.8021, lon: 38.9968, Total: 622239, Earthquake: 599860, Storm: 4150, Flood: 10720, Wildfire: 7509, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Taiwan, China", lat: 23.6978, lon: 120.9605, Total: 18702, Earthquake: 0, Storm: 18647, Flood: 49, Wildfire: 6, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Tajikistan", lat: 38.861, lon: 71.2761, Total: 3756, Earthquake: 1425, Storm: 0, Flood: 509, Wildfire: 0, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Tanzania", lat: -6.369, lon: 34.8888, Total: 69775, Earthquake: 0, Storm: 283, Flood: 69492, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Thailand", lat: 15.87, lon: 100.9925, Total: 3181, Earthquake: 0, Storm: 1288, Flood: 1840, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Tonga", lat: -21.1789, lon: -175.1982, Total: 0, Earthquake: 0, Storm: 0, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Tunisia", lat: 33.8869, lon: 9.5375, Total: 2659, Earthquake: 0, Storm: 44, Flood: 0, Wildfire: 2615, Drought: 0, Most_Affected_By: "Wildfire" },
  { country: "Türkiye", lat: 38.9637, lon: 35.2433, Total: 4875191, Earthquake: 4869223, Storm: 749, Flood: 728, Wildfire: 4423, Drought: 0, Most_Affected_By: "Earthquake" },
  { country: "Uganda", lat: 1.3733, lon: 32.2903, Total: 55339, Earthquake: 0, Storm: 2591, Flood: 51990, Wildfire: 0, Drought: 8, Most_Affected_By: "Flood" },
  { country: "Ukraine", lat: 48.3794, lon: 31.1656, Total: 598, Earthquake: 0, Storm: 576, Flood: 22, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "United Kingdom", lat: 55.3781, lon: -3.436, Total: 6784, Earthquake: 0, Storm: 6649, Flood: 30, Wildfire: 17, Drought: 0, Most_Affected_By: "Storm" },
  { country: "United States", lat: 37.0902, lon: -95.7129, Total: 253414, Earthquake: 0, Storm: 189964, Flood: 6112, Wildfire: 57157, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Uruguay", lat: -32.5228, lon: -55.7658, Total: 4341, Earthquake: 0, Storm: 378, Flood: 3907, Wildfire: 4, Drought: 1, Most_Affected_By: "Flood" },
  { country: "Vanuatu", lat: -15.3767, lon: 166.9592, Total: 66000, Earthquake: 865, Storm: 65135, Flood: 0, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Venezuela", lat: 6.4238, lon: -66.5897, Total: 1102, Earthquake: 0, Storm: 0, Flood: 1053, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Viet Nam", lat: 14.0583, lon: 108.2772, Total: 69607, Earthquake: 0, Storm: 34101, Flood: 28753, Wildfire: 0, Drought: 0, Most_Affected_By: "Storm" },
  { country: "Yemen", lat: 15.5527, lon: 48.5164, Total: 151454, Earthquake: 0, Storm: 41223, Flood: 110227, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Zambia", lat: -13.1339, lon: 27.8493, Total: 15785, Earthquake: 0, Storm: 737, Flood: 15048, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" },
  { country: "Zimbabwe", lat: -19.0154, lon: 29.1549, Total: 1410, Earthquake: 0, Storm: 413, Flood: 997, Wildfire: 0, Drought: 0, Most_Affected_By: "Flood" }
];
const data = geoCountries.filter(d => d.Total > 100000).sort((a, b) => b.Total - a.Total);

const top5Countries = geoCountries
  .filter(d => typeof d.Total === "number")
  .sort((a, b) => b.Total - a.Total)
  .slice(0, 5);

const disasterTypes = ["Flood", "Wildfire", "Storm", "Earthquake", "Volcanic activity", "Drought", "Mass Movement"];
const colors = {
  Flood: 'orange',
  Wildfire: 'green',
  Storm: 'red',
  Earthquake: 'purple',
  'Volcanic activity': 'brown',
  Drought: 'pink',
  'Mass Movement': 'gray'
};

const clusterData = geoCountries.filter(d => d.Total > 100000).sort((a, b) => b.Total - a.Total);
const clusterSvg = d3.select("#clusterChart");
const clusterWidth = +clusterSvg.attr("width");
const clusterHeight = +clusterSvg.attr("height");
const clusterPadding = 10;
const clusterMaxWidth = clusterWidth - clusterPadding; // Increased width
const clusterMaxTotal = d3.max(clusterData, d => disasterTypes.reduce((sum, k) => sum + (d[k] || 0), 0));
const clusterSpacing = 60; // Increased spacing
let groupByType = false;
let allBubbles = [];

function drawBubbles() {
  allBubbles = [];

  clusterData.forEach((d, i) => {
    const total = d.Total;
    const scaledWidth = (total / clusterMaxTotal) * clusterMaxWidth;
    const centerY = clusterSpacing * (i + 1);
    const startX = clusterPadding + 1;

    const countryTypes = disasterTypes.filter(type => d[type] && d[type] > 0);
    const disasterBubbleCounts = countryTypes.map(type => ({
      type,
      count: Math.max(1, Math.floor((d[type] || 0) / 1500))
    }));

    let offset = 0;
    const totalBubbleCount = disasterBubbleCounts.reduce((sum, d) => sum + d.count, 0);
    const spacing = totalBubbleCount > 1 ? (scaledWidth - 10) / (totalBubbleCount - 1) : 0;

    let bubbles = disasterBubbleCounts.flatMap(({ type, count }) =>
      Array.from({ length: count }, () => ({ type }))
    );

    if (!groupByType) {
      for (let i = bubbles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bubbles[i], bubbles[j]] = [bubbles[j], bubbles[i]];
      }
    }

    bubbles.forEach(({ type }, j) => {
      const x = groupByType ? offset : Math.random() * (scaledWidth - 10);
      const y = Math.random() * 20 - 10;
      allBubbles.push({
        cx: startX + x,
        cy: centerY + y,
        r: (total / clusterMaxTotal) * 1.5 + Math.random() * 0.8,
        color: colors[type] || 'white',
        key: `${d.country}-${j}`
      });
      offset += groupByType ? spacing : 0;
    });

    // Labels remain static
    clusterSvg.selectAll(`text.label-left-${i}`).data([d])
      .join("text")
      .attr("x", startX - 30)
      .attr("y", centerY + 3)
      .attr("text-anchor", "end")
      .attr("class", `label label-left-${i}`)
      .text(d.country);

    clusterSvg.selectAll(`text.label-right-${i}`).data([d])
      .join("text")
      .attr("x", startX + scaledWidth + 20)
      .attr("y", centerY + 3)
      .attr("class", `label label-right-${i}`)
      .attr("text-anchor", "start")
      .text(total.toLocaleString());
  });

  const bubbles = clusterSvg.selectAll("circle").data(allBubbles, d => d.key);

  bubbles
    .join(
      enter => enter.append("circle")
        .attr("cx", d => d.cx)
        .attr("cy", d => d.cy)
        .attr("r", d => d.r)
        .attr("fill", d => d.color)
        .attr("opacity", 0.9),
      update => update
        .transition()
        .duration(1000)
        .attr("cx", d => d.cx)
        .attr("cy", d => d.cy)
        .attr("r", d => d.r)
        .attr("fill", d => d.color),
      exit => exit.remove()
    );
}

d3.select("#clusterChart")
  .node()
  .parentNode
  .insertAdjacentHTML("beforebegin", `
    <div class="chart-button-container">
      <button class="fixed-button" onclick="toggleGrouping()">Disaster Grouping</button>
    </div>
  `);

function toggleGrouping() {
  groupByType = !groupByType;
  drawBubbles();
}

drawBubbles();


const reportedFigures = {
  "Afghanistan": 1743168,
  "Albania": 15,
  "Algeria": 25901,
  "Angola": 101335,
  "Argentina": 11459,
  "Armenia": 3063,
  "Australia": 7316,
  "Austria": 875,
  "Azerbaijan": 1692,
  "Bangladesh": 1851702,
  "Belarus": 48,
  "Belgium": 199,
  "Benin": 1,
  "Bhutan": 244,
  "Bolivia": 5893,
  "Bosnia and Herzegovina": 125,
  "Botswana": 248,
  "Brazil": 761111,
  "Brunei": 1,
  "Bulgaria": 252,
  "Burkina Faso": 24139,
  "Burundi": 86404,
  "Cabo Verde": 65,
  "Cambodia": 50259,
  "Cameroon": 33821,
  "Canada": 204297,
  "Central African Republic": 69991,
  "Chad": 101989,
  "Chile": 49482,
  "China": 5614604,
  "Colombia": 350653,
  "Comoros": 1,
  "Congo": 163403,
  "Costa Rica": 297,
  "Croatia": 106,
  "Cuba": 45121,
  "Cyprus": 67,
  "Czech Republic": 64,
  "Côte d'Ivoire": 1208,
  "Dem. Rep. Congo": 269259,
  "Denmark": 734,
  "Djibouti": 9,
  "Dominican Republic": 42020,
  "Ecuador": 21484,
  "Egypt": 9,
  "El Salvador": 4899,
  "Equatorial Guinea": 3,
  "Eritrea": 8,
  "Estonia": 9,
  "Eswatini": 33,
  "Ethiopia": 1498496,
  "Fiji": 7081,
  "Finland": 2,
  "France": 8181,
  "Gabon": 1785,
  "Gambia": 5286,
  "Georgia": 40218,
  "Germany": 3453,
  "Ghana": 86209,
  "Greece": 126474,
  "Grenada": 1,
  "Guam": 1582,
  "Guatemala": 47508,
  "Guinea": 36688,
  "Guyana": 62,
  "Haiti": 12335,
  "Honduras": 5787,
  "Hungary": 66,
  "Iceland": 8056,
  "India": 614911,
  "Indonesia": 252388,
  "Iran": 123853,
  "Iraq": 126752,
  "Ireland": 21,
  "Israel": 53,
  "Italy": 42595,
  "Jamaica": 4,
  "Japan": 38325,
  "Jordan": 320,
  "Kazakhstan": 1749,
  "Kenya": 769980,
  "Kuwait": 10,
  "Kyrgyzstan": 57,
  "Lao PDR": 1681,
  "Latvia": 12,
  "Lebanon": 171,
  "Lesotho": 770,
  "Liberia": 14234,
  "Libya": 52618,
  "Lithuania": 0,
  "Luxembourg": 0,
  "Madagascar": 117456,
  "Malawi": 685731,
  "Malaysia": 215400,
  "Maldives": 108,
  "Mali": 9102,
  "Malta": 3,
  "Mauritania": 1101,
  "Mauritius": 2420,
  "Mexico": 230329,
  "Moldova": 2,
  "Mongolia": 4962,
  "Montenegro": 1,
  "Morocco": 584246,
  "Mozambique": 770297,
  "Myanmar": 1230687,
  "Namibia": 1162,
  "Nepal": 155700,
  "Netherlands": 0,
  "New Zealand": 18075,
  "Nicaragua": 816,
  "Niger": 102582,
  "Nigeria": 242947,
  "North Macedonia": 1,
  "Norway": 6212,
  "Oman": 4471,
  "Pakistan": 1946544,
  "Panama": 31,
  "Papua New Guinea": 20592,
  "Paraguay": 16211,
  "Peru": 221714,
  "Philippines": 2889834,
  "Poland": 34,
  "Portugal": 1738,
  "Qatar": 0,
  "Republic of Korea": 46270,
  "Romania": 51,
  "Russia": 17388,
  "Rwanda": 95837,
  "Samoa": 9,
  "Saudi Arabia": 1,
  "Senegal": 253,
  "Serbia": 401,
  "Seychelles": 10,
  "Sierra Leone": 292,
  "Singapore": 2,
  "Slovakia": 86,
  "Slovenia": 8175,
  "Solomon Islands": 1026,
  "Somalia": 2043426,
  "South Africa": 33076,
  "South Sudan": 729195,
  "Spain": 28662,
  "Sri Lanka": 17971,
  "Sudan": 36400,
  "Suriname": 0,
  "Sweden": 3,
  "Switzerland": 496,
  "Syrian Arab Republic": 622239,
  "Tajikistan": 3756,
  "Tanzania": 69775,
  "Thailand": 3181,
  "Timor-Leste": 100,
  "Togo": 22,
  "Trinidad and Tobago": 21,
  "Tunisia": 2659,
  "Turkey": 4875191,
  "Turkmenistan": 0,
  "Uganda": 55339,
  "Ukraine": 598,
  "United Arab Emirates": 4,
  "United Kingdom": 6784,
  "United States": 253414,
  "Uruguay": 4341,
  "Uzbekistan": 1,
  "Vanuatu": 66000,
  "Venezuela": 1102,
  "Viet Nam": 69607,
  "Western Sahara": 0,
  "Yemen": 151454,
  "Zambia": 15785,
  "Zimbabwe": 1410
};
const width = 850;
const height = 450;
const projection = d3.geoNaturalEarth1().scale(160).translate([width / 2, height / 2]);
const path = d3.geoPath().projection(projection);
const svg = d3.select("#bubbleMap");
const mapGroup = svg.append("g");



const hazardColors = {
  'Flood': 'orange',
  'Wildfire': 'green',
  'Storm': 'red',
  'Earthquake': 'purple',
  'Volcanic activity': 'brown',
  'Drought': 'pink',
  'Mass Movement': 'gray'
};
const minTotal = 1;
const maxTotal = 5614604;
const logDomain = [
  minTotal, 15, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500,
  1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700,
  2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900,
  4000, 4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 5000, 5100,
  5200, 5300, 5400, 5454, 5500, 5600, 5700, 5800, 5900, 6000, 6100, 6200,
  6300, 6400, 6500, 6600, 6700, 6800, 6900, 7000, 7100, 7200, 7300, 7400,
  7500, 7600, 7700, 7800, 7900, 8000, 8100, 8200, 8300, 8400, 8500, 8600,
  8700, 8800, 8900, 9000, 9100, 9200, 9300, 9400, 9500, 9600, 9700, 9800,
  9900, 10000, 10100, 10200, 10300, 10400, 10500, 10600, 10700, 10800, 10900,
  11000, 11100, 11200, 11300, 11400, 11500, 11600, 11700, 11800, 11900, 12000,
  12100, 12200, 12300, 12400, 12500, 12600, 12700, 12800, 12900, 13000, 13100,
  13200, 13300, 13400, 13500, 13600, 13700, 13800, 13900, 14000, 14100, 14200,
  14300, 14400, 14500, 14600, 14700, 14800, 14900, 15000, 15100, 25901, 1743168
];

// SCALE for circle radius based on displacement total
const logRange = d3.range(2.0, 20.0, (8.0 / (logDomain.length - 1)));
const logScale = d3.scaleLog().domain(logDomain).range(logRange);
function getRadiusByTotal(total) {
  return logScale(Math.max(total, 1));
}

// FILTERS
const hazardFilter = document.getElementById("hazardFilter");
const sizeFilter = document.getElementById("sizeFilter");
const sizeValue = document.getElementById("sizeValue");

sizeFilter.setAttribute("min", "1");
sizeFilter.setAttribute("max", "1910612");
sizeFilter.setAttribute("value", "1");
sizeFilter.setAttribute("step", "1");

hazardFilter.innerHTML = "";
const allOption = document.createElement("option");
allOption.value = "All";
allOption.text = "All";
hazardFilter.appendChild(allOption);

const emojiCircle = {
  'Flood': '🟠',          // orange
  'Wildfire': '🟢',       // green
  'Storm': '🔴',          // red
  'Earthquake': '🟣',     // purple
  'Volcanic activity': '🟤', // brown
  'Drought': '🟡',        // yellow (closest to pink you’re using)
  'Mass Movement': '⚫️'   // grey/black
};

Object.keys(hazardColors).forEach(hazard => {
  const option = document.createElement("option");
  option.value = hazard;
  // ► Use emoji instead of CSS-coloured bullet
  option.text = `${emojiCircle[hazard]} ${hazard}`;
  hazardFilter.appendChild(option);
});

hazardFilter.addEventListener("change", updateMap);
sizeFilter.addEventListener("input", () => {
  sizeValue.textContent = sizeFilter.value;
  updateMap();
});

// TOOLTIP
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip");

const pie = d3.pie().value(d => d.value);
const arc = d3.arc().innerRadius(0).outerRadius(45);

function getTopHazard(d) {
  const hazardTypes = ['Flood', 'Storm', 'Earthquake', 'Wildfire', 'Drought'];
  let maxHazard = 'Flood';
  let maxValue = d['Flood'] || 0;
  hazardTypes.forEach(hazard => {
    if ((d[hazard] || 0) > maxValue) {
      maxHazard = hazard;
      maxValue = d[hazard];
    }
  });
  return maxHazard;
}

function updateMap() {
  const selectedHazard = hazardFilter.value;
  const minSize = +sizeFilter.value;
  const filteredData = geoCountries.filter(d =>
    (selectedHazard === "All" || (typeof d[selectedHazard] === "number" && d[selectedHazard] > 0)) &&
    typeof d.Total === "number" && d.Total >= minSize
  );

  const circles = mapGroup.selectAll("circle").data(filteredData, d => d.country);
  const merged = circles.enter()
    .append("circle")
    .attr("cx", d => projection([d.lon, d.lat])[0])
    .attr("cy", d => projection([d.lon, d.lat])[1])
    .attr("r", 0)
    .attr("fill-opacity", 0.7)
    .on("mouseover", function (event, d) {
      d3.select(this)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);

      const reported = reportedFigures[d.country] || 0;
      const pieData = Object.entries(hazardColors)
        .filter(([hazard]) => d[hazard] > 0)
        .map(([hazard, color]) => ({ hazard, value: d[hazard], color }));

      tooltip.transition().duration(200).style("opacity", 1);
      tooltip.html(`
        <div style="margin-bottom: 10px">
          <strong>${d.country}</strong><br>
          Total Affected: ${d.Total.toLocaleString()}<br>
          Most Affected By: ${d.Most_Affected_By}<br>
       
        </div>
        <svg width="100" height="100" style="display:block;margin:auto">
          <g transform="translate(50,50)">
            ${pie(pieData).map(p =>
        `<path d="${arc(p)}" fill="${p.data.color}" stroke="#0f172a" stroke-width="1"></path>`
      ).join('')}
          </g>
        </svg>
      `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
    })
    .on("mouseout", function () {
      d3.select(this).attr("stroke", "none");
      tooltip.transition().duration(300).style("opacity", 0);
    })
    .merge(circles);

  merged.transition()
    .duration(1000)
    .ease(d3.easeBackOut)
    .attr("r", d => getRadiusByTotal(d.Total))
    .attr("fill", d => {
      if (selectedHazard === "All") {
        return hazardColors[getTopHazard(d)] || "#3b82f6";
      } else {
        return hazardColors[selectedHazard] || "#3b82f6";
      }
    });

  circles.exit()
    .transition()
    .duration(600)
    .ease(d3.easeCubicIn)
    .attr("r", 0)
    .remove();
}

// DRAW BASE MAP FIRST THEN APPLY BUBBLES
Promise.all([
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
]).then(([world]) => {
  mapGroup.append("g")
    .selectAll("path")
    .data(world.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "#1e293b")
    .style("stroke", "#334155")
    .style("stroke-width", 1)
    .style("fill-opacity", 0)
    .style("stroke-dasharray", function () {
      const length = this.getTotalLength();
      return `${length} ${length}`;
    })
    .style("stroke-dashoffset", function () {
      return this.getTotalLength();
    })
    .transition()
    .duration(2000)
    .ease(d3.easeCubic)
    .style("stroke-dashoffset", 0)
    .style("fill-opacity", 1);

  const infoLayer = mapGroup.append("g").attr("class", "info-layer");

  const spacing = 40;
  const baseY = 400; // lower Y for bottom of map
  const chartWidth = 900;
  const boxWidth = 80;
  const boxHeight = 80;
  const totalBoxWidth = top5Countries.length * (boxWidth + spacing);
  const startX = chartWidth / 2 - totalBoxWidth / 2;


  // Render boxes aligned at bottom, centered
  Promise.all([
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  ]).then(([world]) => {
    // ... map path and mapGroup setup

    const boxHeight = 70;
    const boxWidth = 70;


    const infoLayer = mapGroup.append("g").attr("class", "info-layer");
    const spacing = 30;
    const baseY = 430;
    const totalBoxWidth = top5Countries.length * (boxWidth + spacing);
    const startX = 900 / 2 - totalBoxWidth / 2;

    
    const boxPositions = top5Countries.map((d, i) => ({
      ...d,
      screenX: startX + i * (boxWidth + spacing),
      screenY: baseY
    }));

    boxPositions.forEach((pos, i) => {
      const [cx, cy] = projection([pos.lon, pos.lat]);
      const group = infoLayer.append("g").attr("class", "map-flag");

      const radius = 6;
      const offsetX = 40;
      const boxShift = 8;
      const baseX = pos.screenX + offsetX + i * boxShift;
      const baseYAdjusted = baseY - boxHeight;

      const verticalY1 = baseYAdjusted - 60 - i * 20;
      const verticalY2 = verticalY1 + radius;
      const turnX1 = cx < baseX ? cx + radius : cx - radius;
      const turnX2 = cx < baseX ? baseX - radius : baseX + radius;

      const pathData = [
        `M${cx},${cy}`,
        `L${cx},${verticalY1}`,
        `A${radius},${radius} 0 0 ${cx < baseX ? 0 : 1} ${turnX1},${verticalY2}`,
        `H${turnX2}`,
        `A${radius},${radius} 0 0 ${cx < baseX ? 1 : 0} ${baseX},${verticalY2 + radius}`,
        `L${baseX},${baseYAdjusted}`
      ].join(" ");

      group.append("path")
        .attr("d", pathData)
        .attr("fill", "none")
        .attr("stroke", "White")
        .attr("stroke-opacity", 0.3) // dull by default
        .attr("stroke-width", 1.5)
        .attr("class", "link-path");

      const box = group.append("g")
        .attr("transform", `translate(${baseX - boxWidth / 2}, ${baseYAdjusted})`);

      // Add always-visible background image
      box.append("image")
        .attr("xlink:href", `assets/${pos.country}.png`)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("x", 0)
        .attr("y", 0)
        .attr("opacity", 1)
        .attr("class", "country-bg");

      // Overlay base rect (for border and hover effect)
      box.append("rect")
      .attr("width", boxWidth)
      .attr("height", boxHeight)
      .attr("rx", 8)
      .attr("fill", "#1e293b")
      .attr("fill-opacity", 0.25)
      .attr("stroke", "#facc15")
      .attr("stroke-width", 0)
      .attr("stroke-opacity", 0.4)
      .attr("class", "box-overlay");


      box.append("text")
        .attr("x", boxWidth / 2)
        .attr("y", 60)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "9px")
        .text(`${pos.country}`)
        .attr("class", "label-country");

      box.append("text")
        .attr("x", boxWidth / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "6px")
        .attr("opacity", 0)
        .attr("class", "label-total")
        .text(`${pos.Total.toLocaleString()} displaced`);

      let yOffset = 30;
      const hazards = Object.keys(pos).filter(k => ["Flood", "Storm", "Earthquake", "Wildfire", "Drought"].includes(k) && pos[k] > 0);
      hazards.forEach(hazard => {
        box.append("text")
          .attr("x", boxWidth / 2)
          .attr("y", yOffset)
          .attr("text-anchor", "middle")
          .attr("fill", "#facc15")
          .style("font-size", "6px")
          .attr("opacity", 0)
          .attr("class", "label-hazard")
          .text(`${hazard}: ${pos[hazard].toLocaleString()}`);
        yOffset += 8;
      });
    });

    d3.selectAll(".map-flag")
    .on("mouseover", function () {
      const group = d3.select(this);
      group.select(".box-overlay")
        .transition().duration(300)
        .attr("fill-opacity", 0.95)
        .attr("stroke-width", 2.5)
        .attr("stroke-opacity", 1);
      group.select(".label-country").transition().duration(200).attr("opacity", 0);
      group.select(".label-total").transition().duration(200).attr("opacity", 1);
      group.selectAll(".label-hazard").transition().duration(200).attr("opacity", 1);
      group.select(".link-path").transition().duration(200).attr("stroke-opacity", 1);
    })
    .on("mouseout", function () {
      const group = d3.select(this);
      group.select(".box-overlay")
        .transition().duration(300)
        .attr("fill-opacity", 0.25)
        .attr("stroke-width", 0)
        .attr("stroke-opacity", 0.6);
      group.select(".label-country").transition().duration(200).attr("opacity", 1);
      group.select(".label-total").transition().duration(200).attr("opacity", 0);
      group.selectAll(".label-hazard").transition().duration(200).attr("opacity", 0);
      group.select(".link-path").transition().duration(200).attr("stroke-opacity", 0.3);
    });
  });


  updateMap();
  activateTop5BoxHover();
});

// FIXED LEGEND CONTAINER — STYLED VIA CSS
const legend = d3.select("body")
  .append("div")
  .attr("class", "legend-vertical")
  .html(disasterTypes.map(type =>
    `<div><span style="background:${colors[type]}"></span>${type}</div>`
  ).join(""));

  function addSizeLegend() {
    const sizeLegendGroup = d3.select("#bubbleMap")
      .append("g")
      .attr("id", "size-legend")
      .attr("transform", "translate(750, 320)");
  
    const legendValues = [100000, 1000000, 5000000];
    const radiusScale = d3.scaleSqrt()
      .domain([0, d3.max(legendValues)])
      .range([0, 30]);
  
    sizeLegendGroup.append("text")
      .attr("x", 0)
      .attr("y", -radiusScale(legendValues[2]) - 15)
      .attr("fill", "#facc15")
      .attr("font-size", 12)
      .text("Displacement Scale");
  
    legendValues.reverse().forEach((val, i) => {
      const r = radiusScale(val);
      const cy = -r - i * 2 * r;
  
      sizeLegendGroup.append("circle")
        .attr("cx", 0)
        .attr("cy", cy)
        .attr("r", r)
        .attr("fill", "none")
        .attr("stroke", "#facc15")
        .attr("stroke-width", 1)
        .attr("opacity", 0.5);
  
      sizeLegendGroup.append("line")
        .attr("x1", 0)
        .attr("x2", 50)
        .attr("y1", cy)
        .attr("y2", cy)
        .attr("stroke", "#94a3b8")
        .attr("stroke-dasharray", "4 2");
  
      sizeLegendGroup.append("text")
        .attr("x", 55)
        .attr("y", cy + 4)
        .attr("fill", "#cbd5e1")
        .attr("font-size", 10)
        .text(val.toLocaleString());
    });
  }
  

 /* ───────── Hover tooltip for the clustered-bubble chart ───────── */
(function () {

  // 1. Create one tooltip div (re-uses your .tooltip CSS)
  const tip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("pointer-events", "none")
    .style("opacity", 0);

  // 2. Helper: attach hover handlers to every bubble
  function wireHover () {
    clusterSvg.selectAll("circle")
      .on("mouseover", (event, d) => {

        // Only show when bubbles are grouped by hazard
        if (!groupByType) return;

        /* work out hazard & country without editing drawBubbles() */
        // a. hazard ⇒ from the bubble’s fill colour
        const hazard = Object.entries(colors)
          .find(([, col]) => col === d.color)?.[0];

        if (!hazard) return;   // safety

        // b. country ⇒ row index = bubble Y / spacing
        const row = Math.round(d.cy / clusterSpacing) - 1;
        const cData = clusterData[row] || {};
        const count = cData[hazard] || 0;

        // c. show tooltip
        tip.html(`<strong>
                  ${hazard}: ${count.toLocaleString()}`)
           .style("left",  (event.pageX + 12) + "px")
           .style("top",   (event.pageY + 12) + "px")
           .style("opacity", 1);
      })
      .on("mouseout", () => tip.style("opacity", 0));
  }

  // 3. Wrap the original drawBubbles so wiring runs every redraw
  const oldDraw = drawBubbles;
  drawBubbles = function () {
    oldDraw();
    wireHover();              // (re)attach hover each time
  };

})();  // ← IIFE keeps globals clean
