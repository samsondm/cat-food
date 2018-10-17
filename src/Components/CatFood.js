import React from 'react';
import Package from './Package';
import withCentring from './withCentering';
import './CatFood.scss';

class CatFood extends React.Component {

  state = {
    filter: {
      packageName: 'Нямушка'
    },
    packageStock: {
      'Нямушка': {
        title: 'Сказочное заморское яство',
        warningTitle: 'Котэ не одобряет?',
        saleCaption: 'Чего сидишь? Порадуй котэ, купи.',
        outOfStockCaption: 'Печалька, с #name закончился.',
        tastes: [{
          name: 'фуа-гра',
          portionCount: 10,
          miceCount: 1,
          weight: '0,5',
          description: 'Печень утки развареная артишоками.',
          stock: 3
        }, {
          name: 'рыбой',
          portionCount: 40,
          miceCount: 2,
          weight: '2',
          description: 'Головы щучьи с чесноком да свежей сёмгушка.',
          stock: 5
        }, {
          name: 'курой',
          portionCount: 100,
          miceCount: 5,
          weight: '5',
          description: 'Филе из цыплят с трюфелями в бульоне.',
          isCustomerHappy: true,
          stock: 0
        }]
      }
    }
  }

  render() {
    // filter packages
    let packages = Object.keys(this.state.packageStock)
      .filter(packageName => packageName === this.state.filter.packageName);
    // create single array from results
    packages = packages.length !== 0 ?
      packages.reduce((packages, currName) => {
        const currValue = this.state.packageStock[currName];
        return [
          ...packages,
          ...currValue.tastes.map(taste =>
            <Package
              key={currName + taste.name}
              name={currName}
              title={currValue.title}
              warningTitle={currValue.warningTitle}
              saleCaption={currValue.saleCaption}
              outOfStockCaption={currValue.outOfStockCaption}
              isDisabled={taste.stock ? false : true}
              taste={taste}
            />
          )];
      }, []) :
      [];
    return (
      <section className={"cat-food " + this.props.className}>
        <h1 className="cat-food__header">
          Ты сегодня покормил кота?
        </h1>
        <div className="ie-fix-flex-wrap">
          <div className="cat-food__stock">
            {packages}
          </div>
        </div>
      </section>
    );
  }
}

export default withCentring(CatFood, "100vh");