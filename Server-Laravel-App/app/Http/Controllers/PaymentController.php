<?php

namespace App\Http\Controllers;

use App\Payment\Cashier;
use Illuminate\Http\Request;

class PaymentController extends Controller {

    public function pay(Request $request){

        $address = $request->address;

        $info = [
            "sellerId" => env('2CHECKOUT_SELLER_ID'),
            "merchantOrderId" => rand(1000,100000),
            "token" => $request->token,
            "currency" => 'USD',
            "total" => '15.00',
            'billingAddr' => $address,
            'shippingAddr' => $address
        ];

        $res = Cashier::pay($info);

        if(!$res['success']){
            return response(['message'=>'Unable to pay, please try again'],400);
            //return response(['message'=>$res['message']],400);
        }

        return ['message'=>'Paid Successfully'];

    }

}
