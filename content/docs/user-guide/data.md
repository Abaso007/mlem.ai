# Working with data

<details>

### ⚙️ Expand for setup instructions

If you want to follow along with this tutorial and try MLEM, you can use our
[example repo](https://github.com/iterative/example-mlem-get-started). You'll
need to [fork] it first. Then clone it locally:

[fork]: https://docs.github.com/en/get-started/quickstart/fork-a-repo

```cli
$ git clone <your fork>
$ cd example-mlem-get-started
```

Next let's create an isolated virtual environment to cleanly install all the
requirements (including MLEM) there:

```cli
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
```

</details>

To use data within the MLEM context, so that it is compatible with other operations
such as [mlem apply](/doc/command-reference/apply), one needs to save it as a
[MLEM Object](/doc/user-guide/basic-concepts#mlem-objects).

## Saving data with MLEM

One can use MLEM to save existing data using the [mlem.api.save()](/doc/api-reference/save) API.

As an example, we load the well-known IRIS dataset with `sklearn`, and then save parts of it
with MLEM locally.

```py
# prepare.py
from mlem.api import save
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

def main():
    data, y = load_iris(return_X_y=True, as_frame=True)
    data["target"] = y
    train_data, test_data = train_test_split(data, random_state=42)
    save(train_data, "train.csv")
    save(test_data.drop("target", axis=1), "test_x.csv")
    save(test_data[["target"]], "test_y.csv")

if __name__ == "__main__":
    main()
```

One can see what files were produced by executing the above script:

```cli
$ python prepare.py
$ tree .mlem/dataset/
.mlem/dataset/
├── test_x.csv
├── test_x.csv.mlem
├── test_y.csv
├── test_y.csv.mlem
├── train.csv
└── train.csv.mlem
```

Clearly, every DataFrame was saved along with some metadata
about it. One can of course check the contents of these files.

```cli
$ head -5 .mlem/dataset/train.csv
,sepal length (cm),sepal width (cm),petal length (cm),petal width (cm),target
4,5.0,3.6,1.4,0.2,0
32,5.2,4.1,1.5,0.1,0
142,5.8,2.7,5.1,1.9,2
85,6.0,3.4,4.5,1.6,1
```

<details>

### `$ cat .mlem/dataset/train.csv.mlem`

```yaml
artifacts:
  data:
    hash: add43029d2b464d0884a7d3105ef0652
    size: 2459
    uri: train.csv
object_type: dataset
reader:
  dataset_type:
    columns:
      - ''
      - sepal length (cm)
      - sepal width (cm)
      - petal length (cm)
      - petal width (cm)
      - target
    dtypes:
      - int64
      - float64
      - float64
      - float64
      - float64
      - int64
    index_cols:
      - ''
    type: dataframe
  format: csv
  type: pandas
requirements:
  - module: pandas
    version: 1.4.2
```

</details>

The metadata file has data schema and library requirements for the data that was saved.
Through this, MLEM knows that it needs pandas to load the data. One can of course load
the data in other ways outside the MLEM context as well.

But this approach allows us to NOT explicitly specify if the saved data was `pd.DataFrame`,
`np.array` or `tf.Tensor`. MLEM figures this out and this handy magic also extends to ML models 👋
