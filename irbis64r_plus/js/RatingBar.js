
function RatingBar(ui_ratingBar, setRatingAction, rateControlStateImageUrl_on, rateControlStateImageUrl_off, rateControlStateImageUrl_half)
{
   this._rateControlStateImage_on = new Image();
   this._rateControlStateImage_off = new Image();
   this._rateControlStateImage_half = new Image();
   
   this._ui_ratingBar = ui_ratingBar;
   this._setRatingAction = setRatingAction;
   this._rateControlStateImageUrl_on = rateControlStateImageUrl_on;
   this._rateControlStateImageUrl_off = rateControlStateImageUrl_off;
   this._rateControlStateImageUrl_half = rateControlStateImageUrl_half;
   
   var ratingBar = this;
   for (var i = 1; i <= 5; i++)
   {
      var star_on_click = function (rating) { return function () { ratingBar.setRating(rating); } }(i);
      var ui_star = $("<img/>")
         .attr("id", this.getStarImgId(i))
         .click(star_on_click)
         .attr("title", this.getRatingTextValue(i));
            
      ui_ratingBar.append(ui_star);
   }
}

RatingBar.prototype.getStarImgId = function (number)
{
   return this._ui_ratingBar.attr("id") + "_img_" + number;
}

RatingBar.prototype.showRatingBar = function (rating)
{
   var ratingBar = this;
   
   var rateControlStateImage_on = this._rateControlStateImage_on;
   var rateControlStateImage_off = this._rateControlStateImage_off;
   var rateControlStateImage_half = this._rateControlStateImage_half;
   
   var rateControlStateImageUrl_on = this._rateControlStateImageUrl_on;
   var rateControlStateImageUrl_off = this._rateControlStateImageUrl_off;
   var rateControlStateImageUrl_half = this._rateControlStateImageUrl_half;
   
   var load_rateControlStateImage_on = function (next_action)
   {
      rateControlStateImage_on.onload =
         function ()
         {
            setTimeout(next_action, 0);
         }
      rateControlStateImage_on.src = rateControlStateImageUrl_on;
   }
   
   var load_rateControlStateImage_off = function (next_action)
   {
      rateControlStateImage_off.onload =
         function ()
         {
            setTimeout(
               next_action,
               0);
         }
      rateControlStateImage_off.src = rateControlStateImageUrl_off;
   }
   
   var load_rateControlStateImage_half = function (next_action)
   {
      rateControlStateImage_half.onload =
         function ()
         {
            setTimeout(
               next_action,
               0);
         }
      rateControlStateImage_half.src = rateControlStateImageUrl_half;
   }
   
   load_rateControlStateImage_on(
      function ()
      {
         load_rateControlStateImage_off(
            function ()
            {
               load_rateControlStateImage_half(
                  function ()
                  {
                     ratingBar.showRating(rating);
                  });
            });
      });
}

RatingBar.prototype.getRatingTextValue = function (number)
{
   if (number > 4.5) return "Отлично";
   if (number >= 4) return "Хорошо";
   if (number >= 3) return "Удовлетворительно";
   if (number >= 2) return "Плохо";
   return "Очень плохо";
}

RatingBar.prototype.showOneStar = function (starNumber, rateControlStateImage)
{
   var ui_starImg = $("#" + this.getStarImgId(starNumber));
   ui_starImg.attr("src", rateControlStateImage.src);
}

RatingBar.prototype.showRating = function (rating)
{
   for (var i = 1; i <= 5; i++)
   {
      if (i <= rating)
      {
         this.showOneStar(i, this._rateControlStateImage_on);
         continue;
      }
      if (i <= rating + 0.5)
      {
         this.showOneStar(i, this._rateControlStateImage_half);
         continue;
      }
      this.showOneStar(i, this._rateControlStateImage_off);
   }
}
      
RatingBar.prototype.setRating = function (rating)
{
   var ratingBar = this;
   var onRatingUpdated = function() { ratingBar.showRating(rating); };
   this._setRatingAction(rating, onRatingUpdated);
}

