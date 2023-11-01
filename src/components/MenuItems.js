import '../styles/MenuItems.scss';

export default function MenuItems() {
    return (
        <>
          <tbody>
                  <tr>
                    <td>Pasta</td>
                    <td>$10.99</td>
                    <td>55</td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                </tbody>
        </>
    )
}