import React, { useState } from 'react';

function Responsive() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Rujal Sapkota', email: 'r@gmail.com', role: 'user', createdAt: '2015-02-11' },
        { id: 2, name: 'Suraj Adhikari', email: 'suraj@gmail.com', role: 'user', createdAt: '2015-08-15' },
        { "id": 3, "name": "Julio Wasselin", "email": "jwasselin2@cargocollective.com", "role": "Male", "createdAt": "1/8/2024" },
        { "id": 4, "name": "Emmett Kohring", "email": "ekohring3@gov.uk", "role": "Male", "createdAt": "3/23/2024" },
        { "id": 5, "name": "Tania Heeps", "email": "theeps4@stumbleupon.com", "role": "Female", "createdAt": "4/20/2024" },
        { "id": 6, "name": "Bari O'Lagen", "email": "bolagen5@amazon.co.jp", "role": "Female", "createdAt": "5/24/2024" },
        { "id": 7, "name": "Norry Surtees", "email": "nsurtees6@paginegialle.it", "role": "Male", "createdAt": "4/24/2024" },
        { "id": 8, "name": "Nicola Menchenton", "email": "nmenchenton7@economist.com", "role": "Female", "createdAt": "6/1/2024" },
        { "id": 9, "name": "Michael Moakson", "email": "mmoakson8@aol.com", "role": "Male", "createdAt": "2/24/2024" },
        { "id": 10, "name": "Ashil Livingstone", "email": "alivingstone9@flickr.com", "role": "Agender", "createdAt": "8/23/2024" },
        { "id": 11, "name": "Tillie Klosterman", "email": "tklostermana@photobucket.com", "role": "Bigender", "createdAt": "5/29/2024" },
        { "id": 12, "name": "Erika Klimov", "email": "eklimovb@dailymotion.com", "role": "Female", "createdAt": "6/25/2024" },
        { "id": 13, "name": "Hyacintha Abramowitz", "email": "habramowitzc@netvibes.com", "role": "Female", "createdAt": "11/11/2023" },
        { "id": 14, "name": "Cozmo Geering", "email": "cgeeringd@upenn.edu", "role": "Male", "createdAt": "5/19/2024" },
        { "id": 15, "name": "Germana Sustin", "email": "gsustine@samsung.com", "role": "Female", "createdAt": "2/21/2024" },
        { "id": 16, "name": "Galina Dumingos", "email": "gdumingosf@buzzfeed.com", "role": "Female", "createdAt": "4/7/2024" },
        { "id": 17, "name": "Darren Di Frisco", "email": "ddig@prweb.com", "role": "Male", "createdAt": "8/7/2024" },
        { "id": 18, "name": "Alicea Felder", "email": "afelderh@istockphoto.com", "role": "Female", "createdAt": "6/15/2024" },
        { "id": 19, "name": "Denys Hanlon", "email": "dhanloni@cornell.edu", "role": "Male", "createdAt": "4/4/2024" },
        { "id": 20, "name": "Jacquie MacRonald", "email": "jmacronaldj@google.ru", "role": "Female", "createdAt": "8/28/2024" },
        { "id": 21, "name": "Derrek Bartolomeazzi", "email": "dbartolomeazzik@nationalgeographic.com", "role": "Male", "createdAt": "6/9/2024" },
        { "id": 22, "name": "Jennifer Gannicott", "email": "jgannicottl@nature.com", "role": "Female", "createdAt": "2/21/2024" },
        { "id": 23, "name": "Kassey McIllroy", "email": "kmcillroym@unesco.org", "role": "Female", "createdAt": "10/11/2023" },
        { "id": 24, "name": "Ralf Bradburne", "email": "rbradburnen@yahoo.co.jp", "role": "Male", "createdAt": "4/25/2024" },
        { "id": 25, "name": "Saundra Cajkler", "email": "scajklero@so-net.ne.jp", "role": "Genderqueer", "createdAt": "11/28/2023" },
        { "id": 26, "name": "Worthy Ovesen", "email": "wovesenp@about.me", "role": "Male", "createdAt": "5/22/2024" },
        { "id": 27, "name": "Kimble Cowup", "email": "kcowupq@mysql.com", "role": "Male", "createdAt": "11/13/2023" },
        { "id": 28, "name": "Gannon Kinver", "email": "gkinverr@ameblo.jp", "role": "Male", "createdAt": "5/8/2024" },
        { "id": 29, "name": "Alyce Flynn", "email": "aflynns@hubpages.com", "role": "Female", "createdAt": "11/23/2023" },
        { "id": 30, "name": "Alix Maleby", "email": "amalebyt@reuters.com", "role": "Female", "createdAt": "8/24/2024" },
        { "id": 31, "name": "Leigh Pittet", "email": "lpittetu@hubpages.com", "role": "Female", "createdAt": "11/27/2023" },
        { "id": 32, "name": "Audie Bartalot", "email": "abartalotv@reverbnation.com", "role": "Female", "createdAt": "7/15/2024" },
        { "id": 33, "name": "Marijo Nial", "email": "mnialw@amazonaws.com", "role": "Female", "createdAt": "11/27/2023" },
        { "id": 34, "name": "Miran Boddymead", "email": "mboddymeadx@fotki.com", "role": "Female", "createdAt": "10/15/2023" },
        { "id": 35, "name": "Stillman Hannen", "email": "shanneny@alexa.com", "role": "Male", "createdAt": "1/9/2024" },
        { "id": 36, "name": "Eba Celand", "email": "ecelandz@cloudflare.com", "role": "Female", "createdAt": "7/10/2024" },
        { "id": 37, "name": "Hakim Brownsey", "email": "hbrownsey10@home.pl", "role": "Genderqueer", "createdAt": "4/21/2024" },
        { "id": 38, "name": "Darby Gonnard", "email": "dgonnard11@gizmodo.com", "role": "Male", "createdAt": "11/4/2023" },
        { "id": 39, "name": "Germayne Jonczyk", "email": "gjonczyk12@state.gov", "role": "Polygender", "createdAt": "3/28/2024" },
        { "id": 40, "name": "Ossie Santore", "email": "osantore13@biblegateway.com", "role": "Male", "createdAt": "8/29/2024" },
        { "id": 41, "name": "Nat Kem", "email": "nkem14@yahoo.com", "role": "Genderqueer", "createdAt": "6/10/2024" },
        { "id": 42, "name": "Rosene Rickett", "email": "rrickett15@cocolog-nifty.com", "role": "Female", "createdAt": "2/14/2024" },
        { "id": 43, "name": "Mellisa Simunek", "email": "msimunek16@exblog.jp", "role": "Female", "createdAt": "12/23/2023" },
        { "id": 44, "name": "Antonina Ray", "email": "aray17@cargocollective.com", "role": "Female", "createdAt": "4/18/2024" },
        { "id": 45, "name": "Dominica Millea", "email": "dmillea18@wsj.com", "role": "Female", "createdAt": "6/6/2024" },
        { "id": 46, "name": "Bernardina Spenclay", "email": "bspenclay19@people.com.cn", "role": "Female", "createdAt": "12/19/2023" },
        { "id": 47, "name": "Rodney Conrart", "email": "rconrart1a@newyorker.com", "role": "Male", "createdAt": "1/29/2024" },
        { "id": 48, "name": "Mommy Elderbrant", "email": "melderbrant1b@earthlink.net", "role": "Female", "createdAt": "8/27/2024" },
        { "id": 49, "name": "Monroe Housby", "email": "mhousby1c@hc360.com", "role": "Male", "createdAt": "7/10/2024" },
        { "id": 50, "name": "Holmes Dainty", "email": "hdainty1d@alexa.com", "role": "Male", "createdAt": "11/6/2023" },
        { "id": 51, "name": "Winifred Cakes", "email": "wcakes0@dropbox.com", "role": "Female", "createdAt": "6/11/2024" },
        { "id": 52, "name": "Barny Veall", "email": "bveall1@miibeian.gov.cn", "role": "Male", "createdAt": "2/15/2024" },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [expandedRow, setExpandedRow] = useState(null);
    const [hiddenColumns, setHiddenColumns] = useState([]);

    const handleRowClick = (userId) => {
        setExpandedRow(expandedRow === userId ? null : userId);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleResize = () => {
        let newHiddenColumns = [];
        let matchedMaxWidth = Infinity; // Initialize with a large value
    
        const mediaQueries = [
            { maxWidth: 720, columns: ['Created At'] },
            { maxWidth: 650, columns: ['Role', 'Created At'] },
            { maxWidth: 555, columns: ['Email', 'Role', 'Created At'] },
        ];
    
        for (const mediaQuery of mediaQueries) {
            if (window.innerWidth <= mediaQuery.maxWidth && mediaQuery.maxWidth < matchedMaxWidth) {
                newHiddenColumns = mediaQuery.columns;
                matchedMaxWidth = mediaQuery.maxWidth;
                
            }
        }
        setHiddenColumns(newHiddenColumns);
    };

    React.useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="users-container">
            <h1>Users</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <React.Fragment key={index}>
                            <tr className={expandedRow === user.id ? 'tr-expanding' : ''}>
                                <td>{user.id}</td>
                                <td className="table-expand" onClick={() => handleRowClick(user.id)}>{user.name}</td>
                                <td data-name="Email">{user.email}</td>
                                <td data-name="Role">{user.role}</td>
                                <td data-name="Created At">{user.createdAt}</td>
                                <td>
                                    <button className="edit-button">Edit</button>
                                </td>
                            </tr>
                            {expandedRow === user.id && (
                                <tr>
                                    <td></td>
                                    <td colSpan={6}>
                                        <ul data-r-table-index="4" className="r-table-details">
                                            {hiddenColumns.map((key, index) => {
                                                if (hiddenColumns.includes(key)) {
                                                    const displayKey = key === 'Created At' ? 'Created At' : key;
                                                    const dKey = key === 'Created At' ? 'createdAt' : key.toLowerCase();
                                                    const dataKey = user[dKey];
                                                    return (
                                                        <li key={index} data-r-table-index={index + 1} data-dt-row="4" data-dt-column={index + 1 + hiddenColumns.indexOf(key)}>
                                                            <span className="r-table-title">{displayKey} :</span>
                                                            <span className="r-table-data">{dataKey}</span>
                                                        </li>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </ul>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>

                    ))}

                </tbody>
            </table>
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                    <button
                        key={index + 1}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="pagination-button"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)} >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Responsive;