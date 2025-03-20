import { authStore } from "../../../Redux/AuthStore";
import "./AboutUs.css";

export function AboutUs(): JSX.Element {
    return (
        <div className="AboutUs">
            {authStore.getState().token ? 
            authStore.getState().role === "Company" || authStore.getState().role === "Customer" ?
            <h2>Welcome {authStore.getState().role + " " + authStore.getState().name}</h2>
            : <h2>Welcome admin</h2>
            : <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, soluta quos. Possimus iure ex, neque asperiores vel repellendus, odit minima sit minus eligendi ipsam repudiandae in facilis error consequuntur sapiente!
            Consequatur, doloribus eligendi nulla dolorem animi fugiat ipsum amet modi quam, similique, assumenda esse quidem quasi unde perferendis facilis rerum sed. Dolor sunt asperiores, maxime sequi omnis magnam tenetur culpa!
            Suscipit dolores deserunt corrupti, rerum fugiat minus doloremque laudantium optio facilis quas tenetur dignissimos iste deleniti? Explicabo, quibusdam nulla. Id at iste culpa, laborum possimus aliquam natus impedit ullam aperiam?
            Officia, corrupti, eveniet sint ex et harum, ipsum numquam est asperiores porro iusto similique non? Eius eos quam quia corrupti aperiam assumenda nulla dolorum, doloremque, cupiditate iure dignissimos et consequatur.
            Placeat ab perferendis voluptatem asperiores, provident maxime tempore in sapiente iure labore deleniti aliquid nihil adipisci. Provident id culpa hic modi, laboriosam, repellat natus asperiores illo a, ut iste inventore.
            Ut incidunt odio fugit, laborum nulla quo culpa nobis qui! Itaque maxime temporibus quis officiis saepe eius ut sapiente dolores vel recusandae tempore, aliquam corporis, accusamus doloremque quo rerum ad.
            Error excepturi ut ipsam magnam qui dignissimos recusandae eveniet, illum nihil obcaecati eligendi ipsum quo aliquid odio dolores autem ratione, tempora dicta soluta veniam? Harum facilis error voluptate blanditiis? Commodi.
            Perspiciatis quia provident at. Tempora saepe cumque quis dolore accusamus, rerum culpa praesentium unde beatae voluptatibus molestias officia inventore numquam autem necessitatibus odio corporis excepturi perferendis laborum consequatur. Blanditiis, fugiat.
            Dignissimos maxime quae rem vel aperiam illum temporibus? Perferendis enim beatae soluta numquam inventore illum repellat, iste quisquam quas autem dicta, veritatis ullam exercitationem debitis magni similique maiores, itaque sint.
            Iste veritatis laborum voluptatum saepe. Vero illo officia adipisci quia nam. Temporibus hic dolores pariatur laboriosam quas, soluta illo optio voluptatem inventore. Natus tenetur mollitia, iusto at consequuntur nihil explicabo?
            </div>}
        </div>
    );
}
