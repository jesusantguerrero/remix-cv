import { MetaFunction, LoaderFunction, ActionFunction, useActionData, useTransition } from "remix";
import { useLoaderData, json, Form, redirect } from "remix";
import { IndexData } from "../../types";
import { createCv, getFormData } from "../../utils";


const theVaina: IndexData = {
  name: "Vaina"
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  // https://remix.run/api/remix#json
  return json(theVaina);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  const { data, errors } = getFormData(formData, ['name']);
  if (errors) {
    return errors;
  }
  const cvId = createCv(data);
  return redirect(`/cvs/${cvId}`);
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();
  const errors = useActionData();
  const transition = useTransition();

  return (
    <div className="remix__page">
      <main>
        <h1>My Curriculum Vitae</h1>
        {data.name}
      </main>
      <aside>
        <Form method="post">
          <div>
            <label>Name:
              {errors?.name && <em>Name is required</em>}
              <input type="text" name="name" />
            </label>
          </div>
          <p>
            <button type="submit">
            {transition.submission
            ? "Creating..."
            : "Create new cv"}
            </button>
          </p>
        </Form>
      </aside>
    </div>
  );
}
